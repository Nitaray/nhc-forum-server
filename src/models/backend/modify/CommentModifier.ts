import * as pg from 'pg';
import {Modifier} from './Modifier';
import {StringValuePair} from '../../types/StringValuePair';

export class CommentModifier extends Modifier {
    constructor(connection: pg.Pool) {
        super(connection);

        this.fields.set("\"CreatorID\"", 1);
        this.fields.set("\"DateCreated\"", 2);
        this.fields.set("\"ContainingThreadID\"", 3);
        this.fields.set("\"Content\"", 4);

        this.param_size = 4;

        this.addSQL = "INSERT INTO \"Comment\" (\"CreatorID\", \"DateCreated\", \"ContainingThreadID\", \"Content\")" +
                      " VALUES ($1, $2, $3, $4)";
        
        this.removeSQL = "DELETE FROM \"Comment\" WHERE \"CommentID\" = $1";
    }

    public update(ID: number, values: Array<StringValuePair>): boolean {
        console.log("This Comment schema only allows updating of the comment's content! Please use updateContent()!");
        return false;
    }

    public updateContent(ID: number, newContent: string): void {
        let sqlQuery: string = "UPDATE \"Comment\" SET \"Content\" = $1 WHERE \"CommentID\" = $2";
        return this.updateOneFieldOfID(ID, newContent, sqlQuery);
    }
}