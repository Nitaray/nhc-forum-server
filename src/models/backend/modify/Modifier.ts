import * as pg from 'pg';
import {StringValuePair} from '../../types/StringValuePair';

export class Modifier {
    protected fields: Map<string, number> = new Map<string, number>();

    protected connection: pg.Client;

    protected addSQL: string;
    protected removeSQL: string;
    protected updateSQL: string;

    protected param_size: number = 0;

    constructor(connection: pg.Client) {
        this.connection = connection;
    }

    protected queryExecution(queryStr: string, paramsValues: any[]): void {
        // Begin transaction
        this.connection.query("BEGIN", (err) => {
            if (err) {
                console.log(err);
                return;
            }
            
            this.connection.query(queryStr, paramsValues, (err, results) => {
                if (err) {
                    return this.connection.query("ROLLBACK", () => {
                        console.log(err);
                    });
                }
                
                this.connection.query("COMMIT", (err) => {
                    if (err) {
                        return this.connection.query("ROLLBACK", function() {
                            console.log(err);
                        });
                    }

                    console.log(results.rowCount + ' record(s) changed!');
                });
            });
        });
    }

    public add(values: Array<StringValuePair>): boolean {
        try {
            let queryValues: any[] = this.setParams(values);
            this.queryExecution(this.addSQL, queryValues);
            return true;
        } catch (e) {
            console.log('Insertion failed!');
            console.log(e);
        }

        return false;
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

    public remove(ID: number): boolean {
        try {
            this.queryExecution(this.removeSQL, [ID]);
            return true;
        } catch (e) {
            console.log('Error deletion.');
            console.log(e);
        }

        return false;
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
    protected updateOneFieldOfID(ID: number, value: any, sqlQuery: string): boolean {
        try {
            this.queryExecution(sqlQuery, [value, ID]);
            return true;
        } catch (e) {
            console.log(e);
        }
        
        return false;
    }
}