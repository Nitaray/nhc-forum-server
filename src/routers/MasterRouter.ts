import * as express from 'express';
import { ThreadRouter } from './ThreadRouter';
import { CommentRouter } from './CommentRouter';
import { AdminQueryRouter } from './AdminQueryRouter';

class MasterRouter {
    private _router = express.Router();
    private _threadRouter = ThreadRouter;
    private _commentRouter = CommentRouter;
    private _adminQueryRouter = AdminQueryRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    /**
    * Connect routes to their matching routers.
    */
    private _configure() {
        this._router.use('/api/thread', this._threadRouter);
        this._router.use('/api/comment', this._commentRouter);
        this._router.use('/api/adminQuery/performQuery', this._adminQueryRouter);
    }
}

export = new MasterRouter().router;