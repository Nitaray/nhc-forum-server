import * as express from 'express';
import * as pg from 'pg';
import { DatabaseConnectionManager } from '../models/backend/database/DatabaseConnectionManager';
import * as bodyParser from 'body-parser';
import { UserQuerier } from '../models/backend/query/UserQuerier';
import { User } from '../models/backend/component/User';
import { RoleModifier } from '../models/backend/modify/RoleModifier';
import { Role } from '../models/backend/component/Role';
import { TokenManager } from '../models/backend/auth/TokenManager';

class MyAccountRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/getAccountData', function(req, res) {
            let userID: string = req.query.GetterID as string;
            let userToken: string = req.query.GetterToken as string;
            let userIDToGet: string = req.query.UserIDToGet as string;

            if (userID == null || userToken == null) {
                res.status(400).send("Bad request!");
                return;
            }

            let connection: pg.Pool = DatabaseConnectionManager.getConnection();

            let userQuerier: UserQuerier = new UserQuerier(connection);
            userQuerier.getRoleID(+userID).then((getterRole) => {
                userQuerier.getRoleID(+userIDToGet).then((userToGetRole) => {
                    if (userID != userIDToGet) {
                        if (getterRole == 3) {
                            res.status(403).send("Forbidden!");
                            return;
                        }
                    }

                    if (!TokenManager.checkToken(userID, userToken)) {
                        res.status(403).send("Forbidden!");
                        return;
                    }
        
                    userQuerier.getUserByID(+userID).then((qres) => {
                        let roleID: number = qres.getRoleID();
                        let role: string = "Normal user";
                        if (roleID == 1) role = "Admin";
                        else role = "Moderator";
        
                        res.status(200).send({"Username": qres.getUsername,
                                            "Email": qres.getEmail(),
                                            "FirstName": qres.getFirstName(),
                                            "LastName": qres.getLastName(),
                                            "Status": qres.getStatus(),
                                            "Role": role,
                                            "Gender": qres.getGender(),
                                            "About": qres.getAbout(),
                                            "DateOfBirth": qres.getDateOfBirth(),
                                            "RegistrationDate": qres.getRegistrationDate(),
                                            "Country": qres.getCountry()});
                    });
                });
            });
        });

        // this._router.post('/updateAccountData', bodyParser.json(), function(req, res) {
        //     let sqlQuery: string = req.body.sqlQuery as string;
        //     // console.log(sqlQuery);

        //     if (sqlQuery == null) {
        //         res.status(400).send("Bad request!");
        //         return;
        //     }

        //     let connection: pg.Pool = DatabaseConnectionManager.getConnection();

        //     // perform querying
        //     connection.query(sqlQuery).then((qres) => {
        //         res.status(200).send("Query done!");
        //     }).catch((err) => {
        //         console.log(err)
        //         res.status(404).send("Not found!");
        //     });
        // });
    }
}

let router = new MyAccountRouter().router;

export { router as MyAccountRouter };