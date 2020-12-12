import {Modifier} from '../modify/Modifier';
import {Querier} from '../query/Querier';
import {ForumRelation} from './ForumRelation';

export class User implements ForumRelation {
    private ID: number = 0;
    private username: string = "";
    private email: string = "";
    private firstName: string = "";
    private lastName: string = "";
    private dateOfBirth: Date = null;
    private status: string = "";
    private registrationDate: Date = null;
    private gender: string = "";
    private country: string = "";
    private password: string = "";
    private about: string = "";
    private roleID: number = 0;

    constructor(ID: number, username: string, email: string, firstName: string, lastName: string, dateOfBirth: Date,
                status: string, registrationDate: Date, gender: string, country: string, password: string, about: string,
                roleID: number) {
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

    public getID(): number { return this.ID; }

    public getUsername(): string { return this.username; }

    public getEmail(): string { return this.email; }

    public getFirstName(): string { return this.firstName; }

    public getLastName(): string { return this.lastName; }

    public getDateOfBirth(): Date { return this.dateOfBirth; }

    public getStatus(): string { return this.status; }

    public getRegistrationDate(): Date { return this.registrationDate; }

    public getGender(): string { return this.gender; }

    public getCountry(): string { return this.country; }

    public getPassword(): string { return this.password; }

    public getAbout(): string { return this.about; }

    public getRoleID(): number { return this.roleID; }

    public setFirstName(firstName: string): void { this.firstName = firstName; }

    public setLastName(lastName: string): void { this.lastName = lastName; }

    public setDateOfBirth(dateOfBirth: Date): void { this.dateOfBirth = dateOfBirth; }

    public setStatus(status: string): void { this.status = status; }

    public setGender(gender: string): void { this.gender = gender; }

    public setCountry(country: string): void { this.country = country; }

    public setPassword(password: string): void { this.password = password; }

    public setAbout(about: string): void { this.about = about; }

    public setRoleID(roleID: number): void { this.roleID = roleID; }

    public addToDatabase(modifier: Modifier): void {}

    public removeFromDatabase(modifier: Modifier): void {}

    public cloneFromDatabase(ID: number, querier: Querier): void {}

    public updateToDatabase(modifier: Modifier): void {}
}