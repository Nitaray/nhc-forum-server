import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../models/backend/database/DatabaseConnectionManager';
import { UserModifier } from '../models/backend/modify/UserModifier';
import { AuthUtil } from '../models/backend/auth/AuthUtil';
import * as bodyParser from 'body-parser';
import { UserQuerier } from '../models/backend/query/UserQuerier';

class RegisterRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.post('/', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
            if (req.body.Username == null || req.body.Email == null || req.body.Password == null) {
                res.status(400).send("Missing POST data!");
                return;
            }

            let username: string = req.body.Username as string;
            let email: string = req.body.Email as string;
            let hashedPassword: string = AuthUtil.hashString((req.body.Password as string) + username);

            let userQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
            userQuerier.checkUsername(username).then((isUserExists) => {
                if (isUserExists) {
                    res.status(404).send({ "Status": "User already exists!" });
                } else {
                    let regDateObj = new Date(Date.now());

                    let regDate: string = regDateObj.getUTCFullYear() + '-' +
                                    ('00' + (regDateObj.getUTCMonth()+1)).slice(-2) + '-' +
                                    ('00' + regDateObj.getUTCDate()).slice(-2) + ' 00:00:00';

                    let userModifer = new UserModifier(DatabaseConnectionManager.getConnection());
                    userModifer.add([
                        {key: "\"Username\"", value: username},
                        {key: "\"Password\"", value: hashedPassword},
                        {key: "\"Email\"", value: email},
                        {key: "\"FirstName\"", value: "Cuong"},
                        {key: "\"LastName\"", value: "Nguyen"},
                        {key: "\"DateOfBirth\"", value: "1999-01-01"},
                        {key: "\"Status\"", value: "Active"},
                        {key: "\"RegistrationDate\"", value: regDate},
                        {key: "\"Gender\"", value: "Male"},
                        {key: "\"Country\"", value: "Vietnam"},
                        {key: "\"About\"", value: "You can add a few lines about yourself to me at mastermind0108[at]gmail.com!"},
                        {key: "\"RoleID\"", value: 3},
                    ]);

                    res.status(200).send({ "Status": "Registration executed!" });
                }
            });
        });
    }
}

let router = new RegisterRouter().router;

export { router as RegisterRouter };