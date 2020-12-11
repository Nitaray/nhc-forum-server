import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';
import { UserAuthenticator } from '../models/backend/auth/UserAuthenticator';
import { UserQuerier } from '../models/backend/query/UserQuerier';

class LoginRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.post('/', (req: Request, res: Response, next: NextFunction) => {
            let password: string = req.body.Password as string;
            let username: string = req.body.Username as string;

            let ck_pwd: boolean = UserAuthenticator.auth(username, password + username);

            if (ck_pwd) {
                let userQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
                let userID = userQuerier.getID(username).toString();
                res.status(200).send("Auth OK\nUser ID: " + userID);
            } else {
                res.status(406).send("Auth ERROR, recheck username and password!");
            }
        });
    }
}

let router = new LoginRouter().router;

export { router as LoginRouter };