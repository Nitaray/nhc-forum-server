"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModifier = void 0;
const Modifier_1 = require("./Modifier");
class CommentModifier extends Modifier_1.Modifier {
    constructor(connection) {
        super(connection);
        this.fields.set("CreatorID", 1);
        this.fields.set("DateCreated", 2);
        this.fields.set("ContainingThreadID", 3);
        this.fields.set("Content", 4);
        this.param_size = 4;
        this.addSQL = "INSERT INTO \"Comment\" (CreatorID, DateCreated, ContainingThreadID, Content)" +
            " VALUES ($1, $2, $3, $4)";
        this.removeSQL = "DELETE FROM \"Comment\" WHERE CommentID = $1";
    }
    update(ID, values) {
        console.log("This Comment schema only allows updating of the comment's content! Please use updateContent()!");
        return false;
    }
    updateContent(ID, newContent) {
        let sqlQuery = "UPDATE \"Comment\" SET Content = $1 WHERE CommentID = $2";
        return this.updateOneFieldOfID(ID, newContent, sqlQuery);
    }
}
exports.CommentModifier = CommentModifier;
