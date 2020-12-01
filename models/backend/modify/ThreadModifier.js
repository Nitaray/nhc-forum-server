"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadModifier = void 0;
const Modifier_1 = require("./Modifier");
class ThreadModifier extends Modifier_1.Modifier {
    constructor(connection) {
        super(connection);
        this.fields.set("CreatorID", 1);
        this.fields.set("DateCreated", 2);
        this.fields.set("ThreadTitle", 3);
        this.fields.set("Content", 4);
        this.param_size = 4;
        this.updateSQL = "UPDATE \"Thread\" SET CreatorID = $1, DateCreated = $2, ThreadTitle = $3, Content = $4 WHERE ThreadID = $5";
        this.addSQL = "INSERT INTO \"Thread\" (CreatorID, DateCreated, ThreadTitle, Content)" +
            " VALUES ($1, CONVERT(datetime2, $2), $3, $4)";
        this.removeSQL = "DELETE FROM \"Thread\" WHERE ThreadID = $1";
    }
    updateCreatorID(threadID, newCreatorID) {
        let sqlQuery = "UPDATE \"Thread\" SET CreatorID = $1 WHERE ThreadID = $2";
        return this.updateOneFieldOfID(threadID, newCreatorID, sqlQuery);
    }
    updateThreadTitle(threadID, newThreadTitle) {
        let sqlQuery = "UPDATE \"Thread\" SET ThreadTitle = $1 WHERE TheadID = $2";
        return this.updateOneFieldOfID(threadID, newThreadTitle, sqlQuery);
    }
    updateContent(threadID, newContent) {
        let sqlQuery = "UPDATE \"Thread\" SET Content = $1 WHERE ThreadID = $2";
        return this.updateOneFieldOfID(threadID, newContent, sqlQuery);
    }
}
exports.ThreadModifier = ThreadModifier;
