import {DatabaseConnectionManager} from '../../../controllers/core/DatabaseConnectionManager';
import {AuthUtil} from './AuthUtil';

export class UserAuthenticator {
    private static connection = DatabaseConnectionManager.getConnection();

    public static auth(username: string, password: string): boolean {
        let authentication: boolean = false;
        try {
            let sqlQuery: string = "SELECT Password FROM \"User\" WHERE Username = ?";

            this.connection.query(sqlQuery, [username], function(err, results) {
                if (err) throw err;
                
                if (results.rows[0] != null) {
                    let correctHashedPassword: string = results.rows[0].Password;
                    let hashedPassword: string = AuthUtil.hashString(password);

                    console.log("Password: " + correctHashedPassword + "\nEntered: " + hashedPassword);

                    if (correctHashedPassword == hashedPassword)
                        authentication = true;
                }
            });
        } catch (e) {
            console.log('Authenticate failed.');
            console.log(e);
        }

        return authentication;
    }
}