import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';
import { UserAuthenticator } from '../models/backend/auth/UserAuthenticator';
import { UserQuerier } from '../models/backend/query/UserQuerier';
import * as bodyParser from 'body-parser';
import { TokenManager } from '../models/backend/auth/TokenManager';

class LoginRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.post('/', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
            let password: string = req.body.Password as string;
            let username: string = req.body.Username as string;

            UserAuthenticator.auth(res, username, password + username).then((ck_pwd) => {
                console.log(ck_pwd);
                if (ck_pwd) {
                    let userQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
                    let userID: string = "0";
                    userQuerier.getID(username).then((id) => {
                        userID = id.toString();

                        res.status(200).send({
                            "UserID": userID,
                            "UserToken": TokenManager.createNewToken(userID),
                            "Status": "OK"
                        });
                    });
                } else {
                    res.status(406).send({"Status": "Error"});
                }
            });
        });
    }
}

let router = new LoginRouter().router;

export { router as LoginRouter };