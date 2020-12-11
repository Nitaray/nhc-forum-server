import {Modifier} from './Modifier';
import * as pg from 'pg';

export class ThreadModifier extends Modifier {
    public constructor(connection: pg.Client) {
        super(connection);

        this.fields.set("\"CreatorID\"", 1);
        this.fields.set("\"DateCreated\"", 2);
        this.fields.set("\"ThreadTitle\"", 3);
        this.fields.set("\"Content\"", 4);

        this.param_size = 4;

        this.updateSQL = "UPDATE \"Thread\" SET \"CreatorID\" = $1, \"DateCreated\" = $2, \"ThreadTitle\" = $3, \"Content\" = $4 WHERE \"ThreadID\" = $5";
        this.addSQL = "INSERT INTO \"Thread\" (\"CreatorID\", \"DateCreated\", \"ThreadTitle\", \"Content\")" +
                        " VALUES ($1, TO_DATE($2, 'YYYY-MM-DD'), $3, $4)";
        this.removeSQL = "DELETE FROM \"Thread\" WHERE \"ThreadID\" = $1";
    }

    public updateCreatorID(threadID: number, newCreatorID: number): boolean {
        let sqlQuery: string = "UPDATE \"Thread\" SET \"CreatorID\" = $1 WHERE \"ThreadID\" = $2";
        return this.updateOneFieldOfID(threadID, newCreatorID, sqlQuery);
    }

    public updateThreadTitle(threadID: number, newThreadTitle: string): boolean {
        let sqlQuery: string = "UPDATE \"Thread\" SET \"ThreadTitle\" = $1 WHERE TheadID = $2";
        return this.updateOneFieldOfID(threadID, newThreadTitle, sqlQuery);
    }

    public updateContent(threadID: number, newContent: string): boolean {
        let sqlQuery: string = "UPDATE \"Thread\" SET \"Content\" = $1 WHERE \"ThreadID\" = $2";
        return this.updateOneFieldOfID(threadID, newContent, sqlQuery);
    }
}