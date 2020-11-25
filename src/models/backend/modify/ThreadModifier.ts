import {Modifier} from './Modifier';
import * as mysql from 'mysql';

export class ThreadModifier extends Modifier {
    public constructor(connection: mysql.Connection) {
        super(connection);

        this.fields.set("CreatorID", 1);
        this.fields.set("DateCreated", 2);
        this.fields.set("ThreadTitle", 3);
        this.fields.set("Content", 4);

        this.param_size = 4;

        this.updateSQL = "UPDATE \"Thread\" SET CreatorID = ?, DateCreated = ?, ThreadTitle = ?, Content = ? WHERE ThreadID = ?";
        this.addSQL = "INSERT INTO \"Thread\" (CreatorID, DateCreated, ThreadTitle, Content)" +
                        " VALUES (?, CONVERT(datetime2, ?), ?, ?)";
        this.removeSQL = "DELETE FROM \"Thread\" WHERE ThreadID = ?";
    }

    public updateCreatorID(threadID: number, newCreatorID: number): boolean {
        let sqlQuery: string = "UPDATE \"Thread\" SET CreatorID = ? WHERE ThreadID = ?";
        return this.updateOneFieldOfID(threadID, newCreatorID, sqlQuery);
    }

    public updateThreadTitle(threadID: number, newThreadTitle: string): boolean {
        let sqlQuery: string = "UPDATE \"Thread\" SET ThreadTitle = ? WHERE TheadID = ?";
        return this.updateOneFieldOfID(threadID, newThreadTitle, sqlQuery);
    }

    public updateContent(threadID: number, newContent: string): boolean {
        let sqlQuery: string = "UPDATE \"Thread\" SET Content = ? WHERE ThreadID = ?";
        return this.updateOneFieldOfID(threadID, newContent, sqlQuery);
    }
}