"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Querier = void 0;
class Querier {
    constructor(connection) {
        this.connection = null;
        this.querySQL = "";
        this.connection = connection;
    }
    getByID(id) {
        try {
            let relations = null;
            this.connection.query(this.querySQL, [id], (err, res) => {
                if (err)
                    throw err;
                relations = this.prepareRelations(res);
                if (relations.length != 1)
                    throw new Error("ID does not exist or there are duplicate IDs.");
            });
            return relations.reverse().pop();
        }
        catch (e) {
            console.log(e);
        }
        return null;
    }
}
exports.Querier = Querier;
