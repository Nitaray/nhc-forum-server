import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../models/backend/database/DatabaseConnectionManager';
import { UserAuthenticator } from '../models/backend/auth/UserAuthenticator';
import { UserQuerier } from '../models/backend/query/UserQuerier';
import * as bodyParser from 'body-parser';
import { TokenManager } from '../models/backend/auth/TokenManager';

class LogoutRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.post('/', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
            let userID: string = req.body.UserID as string;
            let userToken: string = req.body.UserToken;

            if (userID == null || userToken == null) {
                res.status(400).send("Bad request!");
                return;
            }

            if (!TokenManager.checkToken(userID, userToken)) {
                res.status(400).send("User token not permitted!");
            } else {
                let ret = TokenManager.deleteUserTokenOfID(userID, userToken);
                if (ret) res.status(200).send("OK");
                else res.status(400).send("Users have not logged in!");
            }
        });
    }
}

let router = new LogoutRouter().router;

export { router as LogoutRouter };