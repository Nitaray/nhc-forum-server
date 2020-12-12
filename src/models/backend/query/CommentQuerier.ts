import { Comment } from '../component/Comment';
import { ForumRelation } from '../component/ForumRelation';
import { Querier } from './Querier';
import * as pg from 'pg';

export class CommentQuerier extends Querier {
    constructor(connection: pg.Pool) {
        super(connection);

        this.querySQL = "SELECT * FROM \"Comment\" WHERE \"CommentID\" = $1";
    }

    protected prepareRelations(res: pg.QueryResult): Array<ForumRelation> {
        let relations: Array<Comment> = new Array<Comment>();

        try {
            let content: string = "";
            let dateCreated: Date = null;
            let commentID: number = 0;
            let creatorID: number = 0;
            let containingThreadID: number = 0;

            for (let i = 0; i < res.rowCount; ++i) {
                commentID = res.rows[i].CommentID;
                creatorID = res.rows[i].CreatorID;
                dateCreated = res.rows[i].DateCreated;
                containingThreadID = res.rows[i].ContainingThreadID;
                content = res.rows[i].Content;

                relations.push(new Comment(commentID, creatorID, dateCreated, containingThreadID, content));
            }

            return relations;
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    public async getCommentByID(id: number): Promise<Comment> {
        let fres: Comment = null;
        await this.getByID(id).then((res) => fres = res as Comment);
        return fres;
    }

    public async getCommentIDsByThreadID(containingThreadID: number): Promise<Array<number>> {
        let SQL: string = "SELECT \"CommentID\" FROM \"Comment\" WHERE \"ContainingThreadID\" = $1";
        try {
            let ids: Array<number> = new Array<number>();

            await this.connection.query(SQL, [containingThreadID]).then((res) => {
                for (let i = 0; i < res.rowCount; ++i) {
                    ids.push(res.rows[i].CommentID);
                }
            }).catch(err => console.log(err));

            return ids;
        } catch (e) {
            console.log(e);
        }
        return null;
    }
}

