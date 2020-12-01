"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowModifier = void 0;
const Modifier_1 = require("./Modifier");
class FollowModifier extends Modifier_1.Modifier {
    constructor(connection) {
        super(connection);
        this.fields.set("UserID", 1);
        this.fields.set("ThreadID", 2);
        this.fields.set("FollowedSince", 3);
        this.param_size = 3;
        this.addSQL = "INSERT INTO \"Follows\" (UserID, ThreadID, FollowedSince)" +
            " VALUES ($1, $2, $3)";
        this.removeSQL = "DELETE FROM \"Follows\" WHERE UserID = $1 AND ThreadID = $2";
    }
    remove(ID) {
        console.log("This schema does not allow remove by one ID! Please use removeWithUserIDAndThreadID(userID, threadID) instead!");
        return false;
    }
    //Typescript does not allow overloading with different number of parameters
    removeWithUserIDAndThreadID(userID, threadID) {
        try {
            this.queryExecution(this.removeSQL, [userID, threadID]);
            return true;
        }
        catch (e) {
            console.log("Follow schema removal failed!");
            console.log(e);
        }
        return false;
    }
    update(ID, values) {
        console.log("This Follow schema does not support updating! Please use add and remove instead!");
        return false;
    }
}
exports.FollowModifier = FollowModifier;
