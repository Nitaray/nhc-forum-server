import {Modifier} from './Modifier';
import {StringValuePair} from '../../types/StringValuePair';
import * as pg from 'pg';

export class ReceivesModifier extends Modifier {
    public constructor(connection: pg.Client) {
        super(connection);

        this.fields.set("UserID", 1);
        this.fields.set("NotificationID", 2);
        this.fields.set("DateReceived", 3);
        this.fields.set("DateRead", 4);

        this.param_size = 4;

        this.addSQL = "INSERT INTO \"Receives\" (UserID, NotificationID, DateReceived, DateRead)" +
                      " VALUES ($1, $2, $3, $4)";

        this.removeSQL = "DELETE FROM \"Receives\" WHERE UserID = $1 AND NotificationID = $2";
    }

    public remove(ID: number): boolean {
        console.log("This Receives schema does not allow removing using only one ID! Please use removeWithUserIDAndNotificationID(userID, notificationID) instead!");
        return false;
    }

    public removeWithUserIDAndNotificationID(userID: number, notificationID: number): boolean {
        try {
            this.queryExecution(this.removeSQL, [userID, notificationID]);
            return true;
        } catch (e) {
            console.log("Receives removal failed!");
            console.log(e);
        }

        return false;
    }

    public update(ID: number, values: Array<StringValuePair>): boolean {
        console.log("This Receives schema only allow updating of DateRead! Please use updateDateRead() instead!");
        return false;
    }

    public updateDateRead(userID: number, notificationID: number, readDate: Date): boolean {
        let sqlQuery: string = "UPDATE \"Receives\" SET DateRead = $1 WHERE UserID = $2 AND NotificationID = $3";
        let date: string = readDate.getUTCFullYear() + '-' +
                            ('00' + (readDate.getUTCMonth()+1)).slice(-2) + '-' +
                            ('00' + readDate.getUTCDate()).slice(-2) + ' ' + 
                            ('00' + readDate.getUTCHours()).slice(-2) + ':' + 
                            ('00' + readDate.getUTCMinutes()).slice(-2) + ':' + 
                            ('00' + readDate.getUTCSeconds()).slice(-2);

        try {
            this.queryExecution(sqlQuery, [date, userID, notificationID]);
            return true;
        } catch (e) {
            console.log("DateRead Receives update failed!");
            console.log(e);
        }

        return false;
    }
}