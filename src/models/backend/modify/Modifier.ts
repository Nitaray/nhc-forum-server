import * as pg from 'pg';
import {StringValuePair} from '../../types/StringValuePair';

export class Modifier {
    protected fields: Map<string, number> = new Map<string, number>();

    protected connection: pg.Pool;

    protected addSQL: string;
    protected removeSQL: string;
    protected updateSQL: string;

    protected param_size: number = 0;

    constructor(connection: pg.Pool) {
        this.connection = connection;
    }

    protected async queryExecution(queryStr: string, paramsValues: any[]): Promise<void> {
        // Begin transaction
        await this.connection.query("BEGIN").then((res) => {
            this.connection.query(queryStr, paramsValues).then((results) => {                
                this.connection.query("COMMIT").then((res2) => {
                    console.log(results.rowCount + ' record(s) changed!');
                }).catch((err) => {
                    console.log(err);
                    this.connection.query("ROLLBACK");
                });
            }).catch((err) => {
                console.log(err);
                this.connection.query("ROLLBACK");
            });
        }).catch((err) => console.log(err));
    }

    public add(values: Array<StringValuePair>): void {
        let queryValues: any[] = this.setParams(values);
        this.queryExecution(this.addSQL, queryValues);
    }

    public update(ID: number, values: Array<StringValuePair>): boolean {
        try {
            let queryValues: any[] = this.setParams(values);
            queryValues.push(ID);
            this.queryExecution(this.updateSQL, queryValues);
            return true;
        } catch (e) {
            console.log('Update failed.');
            console.log(e);
        }

        return false;
    }

    public remove(ID: number): void {
        this.queryExecution(this.removeSQL, [ID]);
    }

    protected setParams(values: Array<StringValuePair>): any[] {
        interface IntValuePair {
            pos: number;
            value: any;
        }

        let params_value_list: IntValuePair[] = [];
        for (let value of values) {
            if (this.fields.has(value.key) && value.value != null)
                params_value_list.push({pos: this.fields.get(value.key), value: value.value});
        }

        params_value_list.sort(function(a: IntValuePair, b: IntValuePair): number {
            if (a.pos > b.pos) return 1;
            else if (a.pos < b.pos) return -1;
            else return 0;
        });

        let queryValues: any[] = [];
        for (let v of params_value_list) {
            queryValues.push(v.value);
        }

        return queryValues;
    }

    /*
     * Performs any update operations that change only one column
     * of only one instance with the provided ID.
     */
    protected async updateOneFieldOfID(ID: number, value: any, sqlQuery: string): Promise<void> {
        await this.queryExecution(sqlQuery, [value, ID]);
    }
}