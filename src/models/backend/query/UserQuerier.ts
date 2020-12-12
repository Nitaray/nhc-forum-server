import { User } from '../component/User';
import { ForumRelation } from '../component/ForumRelation';
import { Querier } from './Querier';
import * as pg from 'pg';

export class UserQuerier extends Querier {
    constructor(connection: pg.Pool) {
        super(connection);

        this.querySQL = "SELECT  * FROM \"User\" WHERE \"UserID\" = $1";
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

    public async getUserByID(id: number): Promise<User> {
        let fuser: User = null;
        await this.getByID(id).then(user => fuser = user as User);
        return fuser;
    }

    public checkUsername(username: string): boolean {
        let SQL: string = "SELECT * FROM \"User\" WHERE \"Username\" = $1";
        let userExists: boolean = false;
        try {
            this.connection.query(SQL, [username]).then((res) => {
                if (res.rowCount > 0)
                    userExists = true;
            }).catch((err) => console.log(err));
        } catch (e) {
            console.log(e);
        }
        return userExists;
    }

    public checkEmail(email: string): boolean {
        let SQL: string = "SELECT * FROM \"User\" WHERE \"Email\" = $1";
        let emailExists: boolean = false;
        try {
            this.connection.query(SQL, [email]).then((res) => {
                if (res.rowCount > 0)
                    emailExists = true;
            }).catch(err => console.log(err));
        } catch (e) {
            console.log(e);
        }
        return emailExists;
    }

    public async getID(username: string): Promise<number> {
        let SQL: string = "SELECT \"UserID\" FROM \"User\" WHERE \"Username\" = $1";
        let userID: number = 0;
        try {
            await this.connection.query(SQL, [username]).then((res) => {
                if (res.rowCount > 0) {
                    userID = res.rows[0].UserID;
                }
            }).catch(err => console.log(err));
        } catch (e) {
            console.log(e);
        }
        return userID;
    }


    public getRegDate(id: number): Date {
        let SQL: string = "SELECT \"RegistrationDate\" FROM \"User\" WHERE \"UserID\" = $1";
        let regDate: Date = null;
        try {
            this.connection.query(SQL, [id]).then((res) => {
                if (res.rowCount > 0)
                    regDate = res.rows[0].RegistrationDate;
            }).catch(err => console.log(err));
        } catch (e) {
            console.log(e);
        }
        return regDate;
    }

    public async getUsername(id: number): Promise<string> {
        let SQL: string = "SELECT \"Username\" FROM \"User\" WHERE \"UserID\" = $1";
        let username: string = null;
        try {
            await this.connection.query(SQL, [id]).then((res) => {
                if (res.rowCount > 0)
                    username = res.rows[0].Username;
            }).catch(err => console.log(err));
        } catch (e) {
            console.log(e);
        }
        return username;
    }

    public async getRoleID(id: number): Promise<number> {
        let SQL: string = "SELECT \"RoleID\" FROM \"User\" WHERE \"UserID\" = $1";
        let roleID: number = 0;
        try {
            await this.connection.query(SQL, [id]).then((res) => {
                if (res.rowCount > 0)
                    roleID = res.rows[0].RoleID;
            }).catch(err => console.log(err));
        } catch (e) {
            console.log(e);
        }
        return roleID;
    }
}