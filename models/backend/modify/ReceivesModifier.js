"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivesModifier = void 0;
const Modifier_1 = require("./Modifier");
class ReceivesModifier extends Modifier_1.Modifier {
    constructor(connection) {
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
    remove(ID) {
        console.log("This Receives schema does not allow removing using only one ID! Please use removeWithUserIDAndNotificationID(userID, notificationID) instead!");
        return false;
    }
    removeWithUserIDAndNotificationID(userID, notificationID) {
        try {
            this.queryExecution(this.removeSQL, [userID, notificationID]);
            return true;
        }
        catch (e) {
            console.log("Receives removal failed!");
            console.log(e);
        }
        return false;
    }
    update(ID, values) {
        console.log("This Receives schema only allow updating of DateRead! Please use updateDateRead() instead!");
        return false;
    }
    updateDateRead(userID, notificationID, readDate) {
        let sqlQuery = "UPDATE \"Receives\" SET DateRead = $1 WHERE UserID = $2 AND NotificationID = $3";
        let date = readDate.getUTCFullYear() + '-' +
            ('00' + (readDate.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + readDate.getUTCDate()).slice(-2) + ' ' +
            ('00' + readDate.getUTCHours()).slice(-2) + ':' +
            ('00' + readDate.getUTCMinutes()).slice(-2) + ':' +
            ('00' + readDate.getUTCSeconds()).slice(-2);
        try {
            this.queryExecution(sqlQuery, [date, userID, notificationID]);
            return true;
        }
        catch (e) {
            console.log("DateRead Receives update failed!");
            console.log(e);
        }
        return false;
    }
}
exports.ReceivesModifier = ReceivesModifier;
