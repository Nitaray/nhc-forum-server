import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';
import { TokenManager } from '../models/backend/auth/TokenManager';
import { ThreadQuerier } from '../models/backend/query/ThreadQuerier';

class FollowedThreadsRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
            let userID: string = req.query.UserID as string;
            let userToken: string = req.query.UserToken as string;

            if (!TokenManager.checkToken(userID, userToken)) {
                res.status(403).send("Forbidden");
            } else {
                let threadQuerier = new ThreadQuerier(DatabaseConnectionManager.getConnection());
                let followedThreadsIDs: Array<number> = null;
                threadQuerier.getFollowedThreadsID(+userID).then((qres) => {
                    followedThreadsIDs = qres;
                    res.status(200).send({ "IDs": followedThreadsIDs });
                });
            }
        });
    }
}

let router = new FollowedThreadsRouter().router;

export { router as FollowedThreadsRouter };