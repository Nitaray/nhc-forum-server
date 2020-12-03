"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthenticator = void 0;
const DatabaseConnectionManager_1 = require("../../../controllers/core/DatabaseConnectionManager");
const AuthUtil_1 = require("./AuthUtil");
class UserAuthenticator {
    static auth(username, password) {
        let authentication = false;
        try {
            let sqlQuery = "SELECT Password FROM \"User\" WHERE Username = $1";
            this.connection.query(sqlQuery, [username], function (err, results) {
                if (err)
                    throw err;
                if (results.rows[0] != null) {
                    let correctHashedPassword = results.rows[0].Password;
                    let hashedPassword = AuthUtil_1.AuthUtil.hashString(password);
                    console.log("Password: " + correctHashedPassword + "\nEntered: " + hashedPassword);
                    if (correctHashedPassword == hashedPassword)
                        authentication = true;
                }
            });
        }
        catch (e) {
            console.log('Authenticate failed.');
            console.log(e);
        }
        return authentication;
    }
}
exports.UserAuthenticator = UserAuthenticator;
UserAuthenticator.connection = DatabaseConnectionManager_1.DatabaseConnectionManager.getConnection();
