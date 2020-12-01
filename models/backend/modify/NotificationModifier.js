"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModifier = void 0;
const Modifier_1 = require("./Modifier");
class NotificationModifier extends Modifier_1.Modifier {
    constructor(connection) {
        super(connection);
        this.fields.set("DateSent", 1);
        this.fields.set("Content", 2);
        this.fields.set("NotificationTitle", 3);
        this.param_size = 3;
        this.addSQL = "INSERT INTO \"Notification\" (DateSent, Content, NotificationTitle) VALUES ($1, $2, $3)";
        this.removeSQL = "DELETE FROM \"Notification\" WHERE NotificationID = $1";
    }
    update(ID, values) {
        console.log("This Notification schema only allows updating of the comment's content! Please use updateContent()!");
        return false;
    }
    updateContent(ID, newContent) {
        let sqlQuery = "UPDATE \"Notification\" SET Content = $1 WHERE NotificationID = $2";
        return this.updateOneFieldOfID(ID, newContent, sqlQuery);
    }
}
exports.NotificationModifier = NotificationModifier;
