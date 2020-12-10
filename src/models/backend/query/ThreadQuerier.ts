import { Querier } from "./Querier";
import * as pg from 'pg';
import { ForumRelation } from "../component/ForumRelation";
import { Thread } from '../component/Thread';

export class ThreadQuerier extends Querier {
    constructor(connection: pg.Client) {
        super(connection);

        this.querySQL = 'SELECT * FROM \"Thread\" WHERE \"ThreadID\" = $1';
    }

    protected prepareRelations(res: pg.QueryResult): Array<ForumRelation> {
        let relations: Array<Thread> = new Array<Thread>();

        try {
            let title: string = "";
            let content: string = "";
            let dateCreated: Date = null;
            let threadID: number = 0;
            let creatorID: number = 0;

            for (let i = 0; i < res.rowCount; ++i) {
                threadID = res.rows[i].ThreadID;
                title = res.rows[i].ThreadTitle;
                content = res.rows[i].Content;
                dateCreated = res.rows[i].DateCreated;
                creatorID = res.rows[i].CreatorID;

                relations.push(new Thread(creatorID, title, content, threadID, dateCreated));
            }
        } catch (e) {
            console.log(e);
        }

        return relations;
    }

    public getThreadByID(id: number): Thread {
        return this.getByID(id) as Thread;
    }

    public getRecentThreadsID(): Array<number> {
        let SQL: string = "SELECT TOP 100 ThreadID FROM \"Thread\" ORDER BY DateCreated DESC";
        try {
            let ids: Array<number> = new Array<number>()
            this.connection.query(SQL, function(err, res) {
                if (err) throw err;

                for (let i = 0; i < res.rowCount; ++i) {
                    ids.push(res.rows[i].ThreadID);
                }
            });

            return ids;
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    public getThreadTitle(ID: number): string {
        let SQL: string = "SELECT ThreadTitle FROM Thread WHERE ThreadID = $1";
        try {
            let title: string = "";
            this.connection.query(SQL, [ID], function(err, res) {
                if (err) throw err;

                title = res.rows[0].ThreadTitle;
            });

            return title;
        } catch (e) {
            console.log(e);
        }
        return "";
    }

    public getTopThreadsID(): Array<number> {
        let SQL: string = "SELECT TOP 100 Thread.ThreadID FROM \"Thread\" " +
                        "JOIN Comment C on Thread.ThreadID = C.ThreadID " +
                        "GROUP BY Thread.ThreadID " +
                        "ORDER BY COUNT(CommentID) DESC;";
        try {
            let ids: Array<number> = new Array<number>();
            
            this.connection.query(SQL, function(err, res) {
                if (err) throw err;

                for (let i = 0; i < res.rowCount; ++i) {
                    ids.push(res.rows[i].ThreadID);
                }
            });

            return ids;
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    public getHotThreadsID(): Array<number> {
        let SQL: string = "SELECT TOP 100 Thread.ThreadID FROM Thread " +
                        "JOIN Comment C on Thread.ThreadID = C.ThreadID " +
                        "WHERE DATEDIFF(day, C.DateCreated, GETDATE()) <= 30 " +
                        "GROUP BY Thread.ThreadID " +
                        "ORDER BY COUNT(CommentID) DESC";
        try {
            let ids: Array<number> = new Array<number>();

            this.connection.query(SQL, function(err, res) {
                if (err) throw err;

                for (let i = 0; i < res.rowCount; ++i) {
                    ids.push(res.rows[i].ThreadID);
                }
            });

            return ids;
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    public getFollowedThreadsID(creatorID: number): Array<number> {
        let SQL: string = "SELECT Thread.ThreadID FROM Thread " +
                        "JOIN Follows F on Thread.ThreadID = F.ThreadID " +
                        "WHERE F.CreatorID = $1 " +
                        "ORDER BY F.FollowedSince DESC ";
        try {
            let ids: Array<number> = new Array<number>();

            this.connection.query(SQL, [creatorID], function(err, res) {
                if (err) throw err;

                for (let i = 0; i < res.rowCount; ++i) {
                    ids.push(res.rows[i].ThreadID);
                }
            });

            return ids;
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    public getThreadIDByUserIDAndTime(creatorID: number, time: Date): number {
        let SQL: string = "SELECT ThreadID FROM Thread WHERE CreatorID = $1 AND DateCreated::date >= $2 AND DateCreated::date <= $3";

        let date: string = time.getUTCFullYear() + '-' +
                            ('00' + (time.getUTCMonth()+1)).slice(-2) + '-' +
                            ('00' + time.getUTCDate()).slice(-2);

        try {
            let id: number = 0;
            this.connection.query(SQL, [creatorID, date, date], function(err, res) {
                if (err) throw err;

                id = res.rows[0].ThreadID;
            })

            return id;
        } catch (e) {
            console.log(e);
        }
        return 0;
    }
}