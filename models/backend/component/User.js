"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(ID, username, email, firstName, lastName, dateOfBirth, status, registrationDate, gender, country, password, about, roleID) {
        this.ID = 0;
        this.username = "";
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.dateOfBirth = null;
        this.status = "";
        this.registrationDate = null;
        this.gender = "";
        this.country = "";
        this.password = "";
        this.about = "";
        this.roleID = 0;
        this.ID = ID;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.status = status;
        this.registrationDate = registrationDate;
        this.gender = gender;
        this.country = country;
        this.password = password;
        this.about = about;
        this.roleID = roleID;
    }
    getID() { return this.ID; }
    getUsername() { return this.username; }
    getEmail() { return this.email; }
    getFirstName() { return this.firstName; }
    getLastName() { return this.lastName; }
    getDateOfBirth() { return this.dateOfBirth; }
    getStatus() { return this.status; }
    getRegistrationDate() { return this.registrationDate; }
    getGender() { return this.gender; }
    getCountry() { return this.country; }
    getPassword() { return this.password; }
    getAbout() { return this.about; }
    getRoleID() { return this.roleID; }
    setFirstName(firstName) { this.firstName = firstName; }
    setLastName(lastName) { this.lastName = lastName; }
    setDateOfBirth(dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    setStatus(status) { this.status = status; }
    setGender(gender) { this.gender = gender; }
    setCountry(country) { this.country = country; }
    setPassword(password) { this.password = password; }
    setAbout(about) { this.about = about; }
    setRoleID(roleID) { this.roleID = roleID; }
    addToDatabase(modifier) { }
    removeFromDatabase(modifier) { }
    cloneFromDatabase(ID, querier) { }
    updateToDatabase(modifier) { }
}
exports.User = User;
