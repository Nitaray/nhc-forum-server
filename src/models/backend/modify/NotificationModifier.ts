import {Modifier} from './Modifier';
import * as mysql from 'mysql';
import {StringValuePair} from '../../types/StringValuePair';

export class NotificationModifier extends Modifier {
    constructor(connection: mysql.Connection) {
        super(connection);

        this.fields.set("DateSent", 1);
        this.fields.set("Content", 2);
        this.fields.set("NotificationTitle", 3);

        this.param_size = 3;

        this.addSQL = "INSERT INTO \"Notification\" (DateSent, Content, NotificationTitle) VALUES (?, ?, ?)";
        
        this.removeSQL = "DELETE FROM \"Notification\" WHERE NotificationID = ?";
    }

    public update(ID: number, values: Array<StringValuePair>): boolean {
        console.log("This Notification schema only allows updating of the comment's content! Please use updateContent()!")
        return false;
    }

    public updateContent(ID: number, newContent: string): boolean {
        let sqlQuery: string = "UPDATE \"Notification\" SET Content = ? WHERE NotificationID = ?";
        return this.updateOneFieldOfID(ID, newContent, sqlQuery);
    }
}