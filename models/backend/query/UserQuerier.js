"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQuerier = void 0;
const User_1 = require("../component/User");
const Querier_1 = require("./Querier");
class UserQuerier extends Querier_1.Querier {
    constructor(connection) {
        super(connection);
        this.querySQL = "SELECT  * FROM \"User\" WHERE UserID = $1";
    }
    prepareRelations(res) {
        let relations = new Array();
        try {
            let username;
            let email;
            let firstName;
            let lastName;
            let status;
            let gender;
            let country;
            let password;
            let about;
            let DOB;
            let regDate;
            let userID;
            let roleID;
            for (let i = 0; i < res.rowCount; ++i) {
                userID = res.rows[i].UserID;
                username = res.rows[i].Username;
                email = res.rows[i].Email;
                firstName = res.rows[i].FirstName;
                lastName = res.rows[i].LastName;
                DOB = res.rows[i].DateOfBirth;
                status = res.rows[i].Status;
                regDate = res.rows[i].RegistrationDate;
                gender = res.rows[i].Gender;
                country = res.rows[i].Country;
                password = res.rows[i].Password;
                about = res.rows[i].About;
                roleID = res.rows[i].RoleID;
                relations.push(new User_1.User(userID, username, email, firstName, lastName, DOB, status, regDate, gender, country, password, about, roleID));
            }
            return relations;
        }
        catch (e) {
            console.log(e);
        }
        return null;
    }
    checkUsername(username) {
        let SQL = "SELECT * FROM \"User\" WHERE Username = $1";
        let userExists = false;
        try {
            this.connection.query(SQL, [username], function (err, res) {
                if (err)
                    throw err;
                if (res.rowCount > 0)
                    userExists = true;
            });
        }
        catch (e) {
            console.log(e);
        }
        return userExists;
    }
    checkEmail(email) {
        let SQL = "SELECT * FROM \"User\" WHERE Email = $1";
        let emailExists = false;
        try {
            this.connection.query(SQL, [email], function (err, res) {
                if (err)
                    throw err;
                if (res.rowCount > 0)
                    emailExists = true;
            });
        }
        catch (e) {
            console.log(e);
        }
        return emailExists;
    }
    getID(username) {
        let SQL = "SELECT UserID FROM \"User\" WHERE Username = $1";
        let userID = 0;
        try {
            this.connection.query(SQL, [username], function (err, res) {
                if (err)
                    throw err;
                if (res.rowCount > 0)
                    userID = res.rows[0].UserID;
            });
        }
        catch (e) {
            console.log(e);
        }
        return userID;
    }
    getRegDate(id) {
        let SQL = "SELECT RegistrationDate FROM \"User\" WHERE UserID = $1";
        let regDate = null;
        try {
            this.connection.query(SQL, [id], function (err, res) {
                if (err)
                    throw err;
                if (res.rowCount > 0)
                    regDate = res.rows[0].RegistrationDate;
            });
        }
        catch (e) {
            console.log(e);
        }
        return regDate;
    }
    getUsername(id) {
        let SQL = "SELECT Username FROM \"User\" WHERE UserID = $1";
        let username = null;
        try {
            this.connection.query(SQL, [id], function (err, res) {
                if (err)
                    throw err;
                if (res.rowCount > 0)
                    username = res.rows[0].Username;
            });
        }
        catch (e) {
            console.log(e);
        }
        return username;
    }
    getRoleID(id) {
        let SQL = "SELECT RoleID FROM \"User\" WHERE UserID = $1";
        let roleID = 0;
        try {
            this.connection.query(SQL, [id], function (err, res) {
                if (err)
                    throw err;
                if (res.rowCount > 0)
                    roleID = res.rows[0].RoleID;
            });
        }
        catch (e) {
            console.log(e);
        }
        return roleID;
    }
}
exports.UserQuerier = UserQuerier;
