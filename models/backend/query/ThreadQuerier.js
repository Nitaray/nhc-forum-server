"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadQuerier = void 0;
const Querier_1 = require("./Querier");
const Thread_1 = require("../component/Thread");
class ThreadQuerier extends Querier_1.Querier {
    constructor(connection) {
        super(connection);
        this.querySQL = 'SELECT * FROM \"Thread\" WHERE ThreadID = $1';
    }
    prepareRelations(res) {
        let relations = new Array();
        try {
            let title = "";
            let content = "";
            let dateCreated = null;
            let threadID = 0;
            let creatorID = 0;
            for (let i = 0; i < res.rowCount; ++i) {
                threadID = res.rows[i].ThreadID;
                title = res.rows[i].ThreadTitle;
                content = res.rows[i].Content;
                dateCreated = res.rows[i].DateCreated;
                creatorID = res.rows[i].CreatorID;
                relations.push(new Thread_1.Thread(creatorID, title, content, threadID, dateCreated));
            }
            return relations;
        }
        catch (e) {
            console.log(e);
        }
        return null;
    }
    getRecentThreadsID() {
        let SQL = "SELECT TOP 100 ThreadID FROM \"Thread\" ORDER BY DateCreated DESC";
        try {
            let ids = new Array();
            this.connection.query(SQL, function (err, res) {
                if (err)
                    throw err;
                for (let i = 0; i < res.rowCount; ++i) {
                    ids.push(res.rows[i].ThreadID);
                }
            });
            return ids;
        }
        catch (e) {
            console.log(e);
        }
        return null;
    }
    getThreadTitle(ID) {
        let SQL = "SELECT ThreadTitle FROM Thread WHERE ThreadID = $1";
        try {
            let title = "";
            this.connection.query(SQL, [ID], function (err, res) {
                if (err)
                    throw err;
                title = res.rows[0].ThreadTitle;
            });
            return title;
        }
        catch (e) {
            console.log(e);
        }
        return "";
    }
    getTopThreadsID() {
        let SQL = "SELECT TOP 100 Thread.ThreadID FROM \"Thread\" " +
            "JOIN Comment C on Thread.ThreadID = C.ThreadID " +
            "GROUP BY Thread.ThreadID " +
            "ORDER BY COUNT(CommentID) DESC;";
        try {
            let ids = new Array();
            this.connection.query(SQL, function (err, res) {
                if (err)
                    throw err;
                for (let i = 0; i < res.rowCount; ++i) {
                    ids.push(res.rows[i].ThreadID);
                }
            });
            return ids;
        }
        catch (e) {
            console.log(e);
        }
        return null;
    }
    getHotThreadsID() {
        let SQL = "SELECT TOP 100 Thread.ThreadID FROM Thread " +
            "JOIN Comment C on Thread.ThreadID = C.ThreadID " +
            "WHERE DATEDIFF(day, C.DateCreated, GETDATE()) <= 30 " +
            "GROUP BY Thread.ThreadID " +
            "ORDER BY COUNT(CommentID) DESC";
        try {
            let ids = new Array();
            this.connection.query(SQL, function (err, res) {
                if (err)
                    throw err;
                for (let i = 0; i < res.rowCount; ++i) {
                    ids.push(res.rows[i].ThreadID);
                }
            });
            return ids;
        }
        catch (e) {
            console.log(e);
        }
        return null;
    }
    getFollowedThreadsID(creatorID) {
        let SQL = "SELECT Thread.ThreadID FROM Thread " +
            "JOIN Follows F on Thread.ThreadID = F.ThreadID " +
            "WHERE F.CreatorID = $1 " +
            "ORDER BY F.FollowedSince DESC ";
        try {
            let ids = new Array();
            this.connection.query(SQL, [creatorID], function (err, res) {
                if (err)
                    throw err;
                for (let i = 0; i < res.rowCount; ++i) {
                    ids.push(res.rows[i].ThreadID);
                }
            });
            return ids;
        }
        catch (e) {
            console.log(e);
        }
        return null;
    }
    getThreadIDByUserIDAndTime(creatorID, time) {
        let SQL = "SELECT ThreadID FROM Thread WHERE CreatorID = $1 AND DateCreated::date >= $2 AND DateCreated::date <= $3";
        let date = time.getUTCFullYear() + '-' +
            ('00' + (time.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + time.getUTCDate()).slice(-2);
        try {
            let id = 0;
            this.connection.query(SQL, [creatorID, date, date], function (err, res) {
                if (err)
                    throw err;
                id = res.rows[0].ThreadID;
            });
            return id;
        }
        catch (e) {
            console.log(e);
        }
        return 0;
    }
}
exports.ThreadQuerier = ThreadQuerier;
