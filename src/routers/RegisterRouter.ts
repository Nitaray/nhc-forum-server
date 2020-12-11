import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';
import { UserModifier } from '../models/backend/modify/UserModifier';
import { AuthUtil } from '../models/backend/auth/AuthUtil';

var bodyParser = require('body-parser')

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
            let body = req.body;
            console.log(body);
            // Front end dùng axios auto parse json nên dùng json nha! -Nguyễn-
            // let username: string = req.query.Username as string;
            // let email: string = req.query.Email as string;
            // let hashedPassword: string = AuthUtil.hashString((req.query.Password as string) + username);

            // let regDateObj = new Date(Date.now());

            // let regDate: string = regDateObj.getUTCFullYear() + '-' +
            //                 ('00' + (regDateObj.getUTCMonth()+1)).slice(-2) + '-' +
            //                 ('00' + regDateObj.getUTCDate()).slice(-2) + ' 00:00:00';

            // let userModifer = new UserModifier(DatabaseConnectionManager.getConnection());
            // userModifer.add([
            //     {key: "\"Username\"", value: username},
            //     {key: "\"Password\"", value: hashedPassword},
            //     {key: "\"Email\"", value: email},
            //     {key: "\"FirstName\"", value: "Cuong"},
            //     {key: "\"LastName\"", value: "Nguyen"},
            //     {key: "\"DateOfBirth\"", value: "01-01-1999"},
            //     {key: "\"Status\"", value: "Active"},
            //     {key: "\"RegistrationDate\"", value: regDate},
            //     {key: "\"Gender\"", value: "Male"},
            //     {key: "\"Country\"", value: "Vietnam"},
            //     {key: "\"About\"", value: "You can add a few lines about yourself to me at mastermind0108[at]gmail.com!"},
            //     {key: "\"RoleID\"", value: 3},
            // ]);

            res.status(200).send("Registration OK!");
        });
    }
}

let router = new RegisterRouter().router;

export { router as RegisterRouter };