import * as pg from 'pg';
import { ForumRelation } from '../component/ForumRelation';

export abstract class Querier {
    protected connection: pg.Pool = null;
    protected querySQL: string = "";
    
    constructor(connection: pg.Pool) {
        this.connection = connection;
    }

    protected async getByID(id: number): Promise<ForumRelation> {
        try {
            let relations: Array<ForumRelation> = null;

            await this.connection.query(this.querySQL, [id]).then((res) => {
                relations = this.prepareRelations(res);

                if (relations.length != 1) {
                    console.log(new Error("ID does not exist or there are duplicate IDs."));
                    return;
                }
            }).catch((err) => console.log(err));

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