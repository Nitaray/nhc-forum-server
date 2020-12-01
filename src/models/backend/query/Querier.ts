import * as pg from 'pg';
import { ForumRelation } from '../component/ForumRelation';

export abstract class Querier {
    protected connection: pg.Client = null;
    protected querySQL: string = "";
    
    constructor(connection: pg.Client) {
        this.connection = connection;
    }

    public getByID(id: number): ForumRelation {
        try {
            let relations: Array<ForumRelation> = null;

            this.connection.query(this.querySQL, [id], (err, res) => {
                if (err) throw err;

                relations = this.prepareRelations(res);

                if (relations.length != 1)
                    throw new Error("ID does not exist or there are duplicate IDs.");
            });

            return relations.reverse().pop();
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    protected abstract prepareRelations(res: pg.QueryResult): Array<ForumRelation>;
}