import * as pg from 'pg';
import {Modifier} from './Modifier';
import {StringValuePair} from '../../types/StringValuePair';

export class FollowModifier extends Modifier {
    constructor(connection: pg.Pool) {
        super(connection);

        this.fields.set("\"UserID\"", 1);
        this.fields.set("\"ThreadID\"", 2);
        this.fields.set("\"FollowedSince\"", 3);
        this.param_size = 3;

        this.addSQL = "INSERT INTO \"Follows\" (\"UserID\", \"ThreadID\", \"FollowedSince\")" +
                      " VALUES ($1, $2, $3)";
        
        this.removeSQL = "DELETE FROM \"Follows\" WHERE \"UserID\" = $1 AND \"ThreadID\" = $2";
    }

    public remove(ID: number): boolean {
        console.log("This schema does not allow remove by one ID! Please use removeWithUserIDAndThreadID(userID, threadID) instead!");
        return false;
    }

    //Typescript does not allow overloading with different number of parameters
    public removeWithUserIDAndThreadID(userID: number, threadID: number): boolean {
        try {
            this.queryExecution(this.removeSQL, [userID, threadID]);
            return true;
        } catch (e) {
            console.log("Follow schema removal failed!");
            console.log(e);
        }

        return false;
    }

    public update(ID: number, values: Array<StringValuePair>): boolean {
        console.log("This Follow schema does not support updating! Please use add and remove instead!");
        return false;
    }
}