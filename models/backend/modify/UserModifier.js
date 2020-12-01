"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModifier = void 0;
const Modifier_1 = require("./Modifier");
class UserModifier extends Modifier_1.Modifier {
    constructor(connection) {
        super(connection);
        this.fields.set("Username", 1);
        this.fields.set("Email", 2);
        this.fields.set("FirstName", 3);
        this.fields.set("LastName", 4);
        this.fields.set("DateOfBirth", 5);
        this.fields.set("Status", 6);
        this.fields.set("RegistrationDate", 7);
        this.fields.set("Gender", 8);
        this.fields.set("Country", 9);
        this.fields.set("Password", 10);
        this.fields.set("About", 11);
        this.fields.set("RoleID", 12);
        this.param_size = 12;
        this.addSQL = "INSERT INTO \"User\" (Username, Email, FirstName, LastName, DateOfBirth, Status, RegistrationDate, " +
            "Gender, Country, Password, About, RoleID)" +
            " VALUES ($1, $2, $3, $4, CONVERT(datetime2, $5), $6, CONVERT(datetime2, $7), $8, $9, $10, $11, $12)";
        this.removeSQL = "DELETE FROM \"User\" WHERE UserID = $1";
        this.updateSQL = "UPDATE \"User\" SET" +
            " Username = $1," +
            " Email = $2," +
            " FirstName = $3," +
            " LastName = $4," +
            " DateOfBirth = $5," +
            " Status = $6," +
            " RegistrationDate = $7," +
            " Gender = $8," +
            " Country = $9," +
            " Password = $10," +
            " About = $11," +
            " RoleID = $12" +
            " WHERE UserID = $13";
    }
    updateUsername(ID, newUsername) {
        let SQL = "UPDATE \"User\" SET Username = $1 WHERE UserID = $2";
        return this.updateOneFieldOfID(ID, newUsername, SQL);
    }
    updateEmail(ID, newEmail) {
        let SQL = "UPDATE \"User\" SET Email = $1 WHERE UserID = $2";
        return this.updateOneFieldOfID(ID, newEmail, SQL);
    }
    updateFirstName(ID, newFirstName) {
        let SQL = "UPDATE \"User\" SET FirstName = $1 WHERE UserID = $2";
        return this.updateOneFieldOfID(ID, newFirstName, SQL);
    }
    updateLastName(ID, newLastName) {
        let SQL = "UPDATE \"User\" SET LastName = $1 WHERE UserID = $2";
        return this.updateOneFieldOfID(ID, newLastName, SQL);
    }
    updateDOB(ID, newDOB) {
        let SQL = "UPDATE \"User\" SET DateOfBirth = $1 WHERE UserID = $2";
        let dob = newDOB.getUTCFullYear() + '-' +
            ('00' + (newDOB.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + newDOB.getUTCDate()).slice(-2) + ' ' +
            ('00' + newDOB.getUTCHours()).slice(-2) + ':' +
            ('00' + newDOB.getUTCMinutes()).slice(-2) + ':' +
            ('00' + newDOB.getUTCSeconds()).slice(-2);
        return this.updateOneFieldOfID(ID, dob, SQL);
    }
    updateStatus(ID, newStatus) {
        let SQL = "UPDATE \"User\" SET Status = $1 WHERE UserID = $2";
        return this.updateOneFieldOfID(ID, newStatus, SQL);
    }
    updateGender(ID, newGender) {
        let SQL = "UPDATE \"User\" SET Gender = $1 WHERE UserID = $2";
        return this.updateOneFieldOfID(ID, newGender, SQL);
    }
    updateCountry(ID, newCountry) {
        let SQL = "UPDATE \"User\" SET Country = $1 WHERE UserID = $2";
        return this.updateOneFieldOfID(ID, newCountry, SQL);
    }
    updatePassword(ID, newPassword) {
        let SQL = "UPDATE \"User\" SET Password = $1 WHERE UserID = $2";
        return this.updateOneFieldOfID(ID, newPassword, SQL);
    }
    updateAbout(ID, newAbout) {
        let SQL = "UPDATE \"User\" SET LastName = $1 WHERE UserID = $2";
        return this.updateOneFieldOfID(ID, newAbout, SQL);
    }
    updateRole(ID, newRoleID) {
        let SQL = "UPDATE \"User\" SET RoleID = $1 WHERE UserID = $2";
        return this.updateOneFieldOfID(ID, newRoleID, SQL);
    }
}
exports.UserModifier = UserModifier;
