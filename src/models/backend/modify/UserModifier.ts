import {Modifier} from './Modifier';
import * as pg from 'pg';

export class UserModifier extends Modifier {
    public constructor(connection: pg.Pool) {
        super(connection);

        this.fields.set("\"Username\"", 1);
        this.fields.set("\"Email\"", 2);
        this.fields.set("\"FirstName\"", 3);
        this.fields.set("\"LastName\"", 4);
        this.fields.set("\"DateOfBirth\"", 5);
        this.fields.set("\"Status\"", 6);
        this.fields.set("\"RegistrationDate\"", 7);
        this.fields.set("\"Gender\"", 8);
        this.fields.set("\"Country\"", 9);
        this.fields.set("\"Password\"", 10);
        this.fields.set("\"About\"", 11);
        this.fields.set("\"RoleID\"", 12);

        this.param_size = 12;

        this.addSQL = "INSERT INTO \"User\" (\"Username\", \"Email\", \"FirstName\", \"LastName\", \"DateOfBirth\", \"Status\", \"RegistrationDate\", " +
                        "\"Gender\", \"Country\", \"Password\", \"About\", \"RoleID\")" +
                        " VALUES ($1, $2, $3, $4, TO_DATE($5, 'YYYY-MM-DD'), $6, TO_DATE($7, 'YYYY-MM-DD'), $8, $9, $10, $11, $12)";

        this.removeSQL = "DELETE FROM \"User\" WHERE \"UserID\" = $1";
        this.updateSQL = "UPDATE \"User\" SET" +
                        " \"Username\" = $1," +
                        " \"Email\" = $2," +
                        " \"FirstName\" = $3," +
                        " \"LastName\" = $4," +
                        " \"DateOfBirth\" = $5," +
                        " \"Status\" = $6," +
                        " \"RegistrationDate\" = $7," +
                        " \"Gender\" = $8," +
                        " \"Country\" = $9," +
                        " \"Password\" = $10," +
                        " \"About\" = $11," +
                        " \"RoleID\" = $12" +
                        " WHERE \"UserID\" = $13";
    }
    
    public async updateUsername(ID: number, newUsername: string): Promise<void> {
        let SQL = "UPDATE \"User\" SET \"Username\" = $1 WHERE \"UserID\" = $2";
        await this.updateOneFieldOfID(ID, newUsername, SQL);
    }

    public async updateEmail(ID: number, newEmail: string): Promise<void> {
        let SQL: string = "UPDATE \"User\" SET \"Email\" = $1 WHERE \"UserID\" = $2";
        await this.updateOneFieldOfID(ID, newEmail, SQL);
    }

    public async updateFirstName(ID: number, newFirstName: string): Promise<void> {
        let SQL: string = "UPDATE \"User\" SET \"FirstName\" = $1 WHERE \"UserID\" = $2";
        await this.updateOneFieldOfID(ID, newFirstName, SQL);
    }

    public async updateLastName(ID: number, newLastName: string): Promise<void> {
        let SQL: string = "UPDATE \"User\" SET \"LastName\" = $1 WHERE \"UserID\" = $2";
        await this.updateOneFieldOfID(ID, newLastName, SQL);
    }

    public async updateDOB(ID: number, newDOB: Date): Promise<void> {
        let SQL: string = "UPDATE \"User\" SET \"DateOfBirth\" = $1 WHERE \"UserID\" = $2";
        let dob: string = newDOB.getUTCFullYear() + '-' +
                        ('00' + (newDOB.getUTCMonth()+1)).slice(-2) + '-' +
                        ('00' + newDOB.getUTCDate()).slice(-2) + ' 00:00:00';
        await this.updateOneFieldOfID(ID, dob, SQL);
    }

    public async updateStatus(ID: number, newStatus: string): Promise<void> {
        let SQL: string = "UPDATE \"User\" SET \"Status\" = $1 WHERE \"UserID\" = $2";
        await this.updateOneFieldOfID(ID, newStatus, SQL);
    }

    public async updateGender(ID: number, newGender: string): Promise<void> {
        let SQL: string = "UPDATE \"User\" SET \"Gender\" = $1 WHERE \"UserID\" = $2";
        await this.updateOneFieldOfID(ID, newGender, SQL);
    }

    public async updateCountry(ID: number, newCountry: string): Promise<void> {
        let SQL: string = "UPDATE \"User\" SET \"Country\" = $1 WHERE \"UserID\" = $2";
        await this.updateOneFieldOfID(ID, newCountry, SQL);
    }

    public async updatePassword(ID: number, newPassword: string): Promise<void> {
        let SQL: string = "UPDATE \"User\" SET \"Password\" = $1 WHERE \"UserID\" = $2";
        await this.updateOneFieldOfID(ID, newPassword, SQL);
    }

    public async updateAbout(ID: number, newAbout: string): Promise<void> {
        let SQL: string = "UPDATE \"User\" SET \"LastName\" = $1 WHERE \"UserID\" = $2";
        await this.updateOneFieldOfID(ID, newAbout, SQL);
    }

    public async updateRole(ID: number, newRoleID: string): Promise<void> {
        let SQL: string = "UPDATE \"User\" SET \"RoleID\" = $1 WHERE \"UserID\" = $2";
        await this.updateOneFieldOfID(ID, newRoleID, SQL);
    }
}