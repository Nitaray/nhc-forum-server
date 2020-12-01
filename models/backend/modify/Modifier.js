"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modifier = void 0;
class Modifier {
    constructor(connection) {
        this.param_size = 0;
        this.connection = connection;
    }
    queryExecution(queryStr, paramsValues) {
        // Begin transaction
        this.connection.query("BEGIN", (err) => {
            if (err)
                throw err;
            this.connection.query(queryStr, paramsValues, (err, results) => {
                if (err) {
                    return this.connection.query("ROLLBACK", () => {
                        throw err;
                    });
                }
                this.connection.query("COMMIT", (err) => {
                    if (err) {
                        return this.connection.query("ROLLBACK", function () {
                            throw err;
                        });
                    }
                    console.log(results.rowCount + ' record(s) changed!');
                });
            });
        });
    }
    add(values) {
        try {
            let queryValues = this.setParams(values);
            this.queryExecution(this.addSQL, queryValues);
            return true;
        }
        catch (e) {
            console.log('Insertion failed!');
            console.log(e);
        }
        return false;
    }
    update(ID, values) {
        try {
            let queryValues = this.setParams(values);
            queryValues.push(ID);
            this.queryExecution(this.updateSQL, queryValues);
            return true;
        }
        catch (e) {
            console.log('Update failed.');
            console.log(e);
        }
        return false;
    }
    remove(ID) {
        try {
            this.queryExecution(this.removeSQL, [ID]);
            return true;
        }
        catch (e) {
            console.log('Error deletion.');
            console.log(e);
        }
        return false;
    }
    setParams(values) {
        let params_value_list = [];
        for (let value of values) {
            if (this.fields.has(value.key) && value.value != null)
                params_value_list.push({ pos: this.fields.get(value.key), value: value.value });
        }
        params_value_list.sort(function (a, b) {
            if (a.pos > b.pos)
                return 1;
            else if (a.pos < b.pos)
                return -1;
            else
                return 0;
        });
        let queryValues = [];
        for (let v of params_value_list) {
            queryValues.push(v.value);
        }
        return queryValues;
    }
    /*
     * Performs any update operations that change only one column
     * of only one instance with the provided ID.
     */
    updateOneFieldOfID(ID, value, sqlQuery) {
        try {
            this.queryExecution(sqlQuery, [value, ID]);
            return true;
        }
        catch (e) {
            console.log(e);
        }
        return false;
    }
}
exports.Modifier = Modifier;
