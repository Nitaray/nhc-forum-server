import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';
import { ThreadQuerier } from '../models/backend/query/ThreadQuerier';

class HotThreadsRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.post('/', (req: Request, res: Response, next: NextFunction) => {
            let threadQuerier = new ThreadQuerier(DatabaseConnectionManager.getConnection());
            let hotThreadIDs = threadQuerier.getHotThreadsID();

            res.status(200).send(hotThreadIDs);
        });
    }
}

let router = new HotThreadsRouter().router;

export { router as HotThreadsRouter };