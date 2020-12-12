import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../models/backend/database/DatabaseConnectionManager';
import { ThreadQuerier } from '../models/backend/query/ThreadQuerier';

class NewThreadsRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
            let threadQuerier = new ThreadQuerier(DatabaseConnectionManager.getConnection());
            threadQuerier.getRecentThreadsID().then(recentThreadIDs => res.status(200).send({ "IDs": recentThreadIDs }));
        });
    }
}

let router = new NewThreadsRouter().router;

export { router as NewThreadsRouter };