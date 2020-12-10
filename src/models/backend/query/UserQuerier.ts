import { User } from '../component/User';
import { ForumRelation } from '../component/ForumRelation';
import { Querier } from './Querier';
import * as pg from 'pg';
import e from 'express';
import { urlencoded } from 'body-parser';

export class UserQuerier extends Querier {
    constructor(connection: pg.Client) {
        super(connection);

        this.querySQL = "SELECT  * FROM \"User\" WHERE UserID = $1";
    }

    protected prepareRelations(res: pg.QueryResult): Array<ForumRelation> {
        let relations: Array<User> = new Array<User>();

        try {
            let username: string;
            let email: string;
            let firstName: string;
            let lastName: string;
            let status: string;
            let gender: string;
            let country: string;
            let password: string;
            let about: string;
            let DOB: Date;
            let regDate: Date;
            let userID: number;
            let roleID: number;

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

                relations.push(new User(userID, username, email, firstName, lastName, DOB, status, regDate, gender,
                                        country, password, about, roleID));
            }
        } catch (e) {
            console.log(e);
        }
        return relations;
    }

    public getUserByID(id: number): User {
        return this.getByID(id) as User;
    }

    public checkUsername(username: string): boolean {
        let SQL: string = "SELECT * FROM \"User\" WHERE Username = $1";
        let userExists: boolean = false;
        try {
            this.connection.query(SQL, [username], function(err, res) {
                if (err) throw err;

                if (res.rowCount > 0)
                    userExists = true;
            });
        } catch (e) {
            console.log(e);
        }
        return userExists;
    }

    public checkEmail(email: string): boolean {
        let SQL: string = "SELECT * FROM \"User\" WHERE Email = $1";
        let emailExists: boolean = false;
        try {
            this.connection.query(SQL, [email], function(err, res) {
                if (err) throw err;

                if (res.rowCount > 0)
                    emailExists = true;
            });
        } catch (e) {
            console.log(e);
        }
        return emailExists;
    }

    public getID(username: string): number {
        let SQL: string = "SELECT UserID FROM \"User\" WHERE Username = $1";
        let userID: number = 0;
        try {
            this.connection.query(SQL, [username], function(err, res) {
                if (err) throw err;

                if (res.rowCount > 0)
                    userID = res.rows[0].UserID;
            });
        } catch (e) {
            console.log(e);
        }
        return userID;
    }


    public getRegDate(id: number): Date {
        let SQL: string = "SELECT RegistrationDate FROM \"User\" WHERE UserID = $1";
        let regDate: Date = null;
        try {
            this.connection.query(SQL, [id], function(err, res) {
                if (err) throw err;

                if (res.rowCount > 0)
                    regDate = res.rows[0].RegistrationDate;
            });
        } catch (e) {
            console.log(e);
        }
        return regDate;
    }

    public getUsername(id: number): string {
        let SQL: string = "SELECT Username FROM \"User\" WHERE UserID = $1";
        let username: string = null;
        try {
            this.connection.query(SQL, [id], function(err, res) {
                if (err) throw err;

                if (res.rowCount > 0)
                    username = res.rows[0].Username;
            });
        } catch (e) {
            console.log(e);
        }
        return username;
    }

    public getRoleID(id: number): number {
        let SQL: string = "SELECT RoleID FROM \"User\" WHERE UserID = $1";
        let roleID: number = 0;
        try {
            this.connection.query(SQL, [id], function(err, res) {
                if (err) throw err;

                if (res.rowCount > 0)
                    roleID = res.rows[0].RoleID;
            });
        } catch (e) {
            console.log(e);
        }
        return roleID;
    }
}