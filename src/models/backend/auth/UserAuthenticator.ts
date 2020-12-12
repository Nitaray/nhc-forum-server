import {DatabaseConnectionManager} from '../database/DatabaseConnectionManager';
import {AuthUtil} from './AuthUtil';
import * as express from 'express';
import { UserQuerier } from '../query/UserQuerier';

export class UserAuthenticator {
    private static connection = DatabaseConnectionManager.getConnection();

    public static async auth(res: express.Response<any>, username: string, password: string): Promise<boolean> {
        let authentication: boolean = false;
        try {
            let sqlQuery: string = "SELECT \"Password\" FROM \"User\" WHERE \"Username\" = $1";

            await this.connection.query(sqlQuery, [username]).then((res) => {
                if (res.rows[0] != null) {
                    let correctHashedPassword: string = res.rows[0].Password;
                    let hashedPassword: string = AuthUtil.hashString(password);

                    console.log("\"Password\": " + correctHashedPassword + "\nEntered: " + hashedPassword);

                    if (correctHashedPassword == hashedPassword) {
                        console.log("PW accepted");
                        authentication = true;
                    }
                }
            }).catch(err => console.log(err));
        } catch (e) {
            console.log('Authenticate failed.');
            console.log(e);
        }

        return authentication;
    }
}