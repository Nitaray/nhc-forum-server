"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentQuerier = void 0;
const Comment_1 = require("../component/Comment");
const Querier_1 = require("./Querier");
class CommentQuerier extends Querier_1.Querier {
    constructor(connection) {
        super(connection);
        this.querySQL = "SELECT * FROM \"Comment\" WHERE CommentID = $1";
    }
    prepareRelations(res) {
        let relations = new Array();
        try {
            let content = "";
            let dateCreated = null;
            let commentID = 0;
            let creatorID = 0;
            let containingThreadID = 0;
            for (let i = 0; i < res.rowCount; ++i) {
                commentID = res.rows[i].CommentID;
                creatorID = res.rows[i].CreatorID;
                dateCreated = res.rows[i].DateCreated;
                containingThreadID = res.rows[i].ContainingThreadID;
                content = res.rows[i].Content;
                relations.push(new Comment_1.Comment(commentID, creatorID, dateCreated, containingThreadID, content));
            }
            return relations;
        }
        catch (e) {
            console.log(e);
        }
        return null;
    }
    getCommentIDsByThreadID(containingThreadID) {
        let SQL = "SELECT CommentID FROM Comment WHERE ContainingThreadID = $1";
        try {
            let ids = new Array();
            this.connection.query(SQL, [containingThreadID], function (err, res) {
                if (err)
                    throw err;
                for (let i = 0; i < res.rowCount; ++i) {
                    ids.push(res.rows[i].CommentID);
                }
            });
            return ids;
        }
        catch (e) {
            console.log(e);
        }
        return null;
    }
}
exports.CommentQuerier = CommentQuerier;
