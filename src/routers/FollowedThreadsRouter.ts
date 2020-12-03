import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';
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
        this._router.post('/', (req: Request, res: Response, next: NextFunction) => {
            let userID: number = +req.params.UserID;
            let threadQuerier = new ThreadQuerier(DatabaseConnectionManager.getConnection());
            let followedThreadsIDs = threadQuerier.getFollowedThreadsID(userID);

            res.status(200).send(followedThreadsIDs);
        });
    }
}

let router = new FollowedThreadsRouter().router;

export { router as FollowedThreadsRouter };