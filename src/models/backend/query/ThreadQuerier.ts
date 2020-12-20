import { Querier } from "./Querier";
import * as pg from 'pg';
import { ForumRelation } from "../component/ForumRelation";
import { Thread } from '../component/Thread';

export class ThreadQuerier extends Querier {
    constructor(connection: pg.Pool) {
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

    public async getThreadByID(id: number): Promise<Thread> {
        let fres: Thread = null;
        await this.getByID(id).then(res => fres = res as Thread);
        return fres;
    }

    public async getRecentThreadsID(): Promise<Array<number>> {
        let SQL: string = "SELECT \"ThreadID\" FROM \"Thread\" ORDER BY \"DateCreated\" DESC LIMIT 100";
        try {
            let ids: Array<number> = new Array<number>()
            await this.connection.query(SQL).then((res) => {
                for (let i = 0; i < res.rowCount; ++i) {
                    ids.push(res.rows[i].ThreadID);
                }
            }).catch((err) => console.log(err));

            return ids;
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    public getThreadTitle(ID: number): string {
        let SQL: string = "SELECT \"ThreadTitle\" FROM \"Thread\" WHERE \"ThreadID\" = $1";
        try {
            let title: string = "";
            this.connection.query(SQL, [ID]).then((res) => title = res.rows[0].ThreadTitle).catch((err) => console.log(err));

            return title;
        } catch (e) {
            console.log(e);
        }
        return "";
    }

    public getTopThreadsID(): Array<number> {
        let SQL: string = "SELECT \"Thread\".\"ThreadID\" FROM \"Thread\" " +
                        "JOIN Comment C on \"Thread\".\"ThreadID\" = C.\"ThreadID\" " +
                        "GROUP BY \"Thread\".\"ThreadID\" " +
                        "ORDER BY COUNT(\"CommentID\") DESC LIMIT 100;";
        try {
            let ids: Array<number> = new Array<number>();
            
            this.connection.query(SQL).then((res) => {
                for (let i = 0; i < res.rowCount; ++i) {
                    ids.push(res.rows[i].ThreadID);
                }
            }).catch((err) => console.log(err));

            return ids;
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    public async getHotThreadsID(): Promise<Array<number>> {
        let SQL: string = "SELECT \"Thread\".\"ThreadID\" FROM \"Thread\"" + 
                        "JOIN \"Comment\" C on \"Thread\".\"ThreadID\" = C.\"ContainingThreadID\"" +
                        "WHERE date_part('day', NOW() - C.\"DateCreated\") <= 30 "
                        "GROUP BY \"Thread\".\"ThreadID\"" +
                        "ORDER BY COUNT(\"CommentID\") DESC" +
                        " LIMIT 100";
        try {
            let ids: Array<number> = new Array<number>();

            await this.connection.query(SQL).then((res) => {
                for (let i = 0; i < res.rowCount; ++i) {
                    ids.push(res.rows[i].ThreadID);
                }
            }).catch((err) => console.log(err));

            return ids;
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    public async getFollowedThreadsID(creatorID: number): Promise<Array<number>> {
        let SQL: string = "SELECT \"Thread\".\"ThreadID\" FROM \"Thread\" " +
                        "JOIN \"Follows\" on \"Thread\".\"ThreadID\" = \"Follows\".\"ThreadID\" " +
                        "WHERE \"Follows\".\"UserID\" = $1 " +
                        "ORDER BY \"Follows\".\"FollowedSince\" DESC ";
        try {
            let ids: Array<number> = new Array<number>();

            await this.connection.query(SQL, [creatorID]).then((res) => {
                for (let i = 0; i < res.rowCount; ++i) {
                        ids.push(res.rows[i].ThreadID);
                }
            }).catch(err => console.log(err));

            return ids;
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    public async searchThreadByTitle(title: string): Promise<Array<number>> {
        let sqlQuery: string = "SELECT \"ThreadID\" FROM \"Thread\" " +
                                "WHERE \"ThreadTitle\" LIKE '%" + title + "%'";
        let threadIDs: Array<number> = new Array<number>();
        await this.connection.query(sqlQuery).then((res) => {
            for (let i = 0; i < res.rowCount; ++i) {
                threadIDs.push(res.rows[i].ThreadID);
            }
        }).catch(err => console.log(err));

        return threadIDs;
    }

    public getThreadIDByUserIDAndTime(creatorID: number, time: Date): number {
        let SQL: string = "SELECT \"ThreadID\" FROM \"Thread\" WHERE \"CreatorID\" = $1 AND \"DateCreated\"::date >= $2 AND \"DateCreated\"::date <= $3";

        let date: string = time.getUTCFullYear() + '-' +
                            ('00' + (time.getUTCMonth()+1)).slice(-2) + '-' +
                            ('00' + time.getUTCDate()).slice(-2);

        try {
            let id: number = 0;
            this.connection.query(SQL, [creatorID, date, date]).then((res) => id = res.rows[0].ThreadID).catch(err => console.log(err));

            return id;
        } catch (e) {
            console.log(e);
        }
        return 0;
    }
}