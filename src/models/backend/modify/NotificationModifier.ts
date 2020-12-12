import {Modifier} from './Modifier';
import * as pg from 'pg';
import {StringValuePair} from '../../types/StringValuePair';

export class NotificationModifier extends Modifier {
    constructor(connection: pg.Pool) {
        super(connection);

        this.fields.set("\"DateSent\"", 1);
        this.fields.set("\"Content\"", 2);
        this.fields.set("\"NotificationTitle\"", 3);

        this.param_size = 3;

        this.addSQL = "INSERT INTO \"Notification\" (\"DateSent\", \"Content\", \"NotificationTitle\") VALUES ($1, $2, $3)";
        
        this.removeSQL = "DELETE FROM \"Notification\" WHERE \"NotificationID\" = $1";
    }

    public update(ID: number, values: Array<StringValuePair>): boolean {
        console.log("This Notification schema only allows updating of the comment's content! Please use updateContent()!")
        return false;
    }

    public updateContent(ID: number, newContent: string): void {
        let sqlQuery: string = "UPDATE \"Notification\" SET \"Content\" = $1 WHERE \"NotificationID\" = $2";
        return this.updateOneFieldOfID(ID, newContent, sqlQuery);
    }
}