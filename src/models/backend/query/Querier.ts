import * as pg from 'pg';
import { ForumRelation } from '../component/ForumRelation';

export abstract class Querier {
    protected connection: pg.Client = null;
    protected querySQL: string = "";
    
    constructor(connection: pg.Client) {
        this.connection = connection;
    }

    protected getByID(id: number): ForumRelation {
        try {
            let relations: Array<ForumRelation> = null;

            this.connection.query(this.querySQL, [id], (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }

                relations = this.prepareRelations(res);

                if (relations.length != 1) {
                    console.log(new Error("ID does not exist or there are duplicate IDs."));
                    return;
                }
            });

            if (relations.length == 0)
                return null;
            return relations.shift();
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    protected abstract prepareRelations(res: pg.QueryResult): Array<ForumRelation>;
}