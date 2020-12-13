import * as express from 'express';
import { ThreadRouter } from './ThreadRouter';
import { CommentRouter } from './CommentRouter';
import { AdminQueryRouter } from './AdminQueryRouter';
import { LoginRouter } from './LoginRouter';
import { RegisterRouter } from './RegisterRouter';
import { HotThreadsRouter } from './HotThreadsRouter';
import { NewThreadsRouter } from './NewThreadsRouter';
import { FollowedThreadsRouter } from './FollowedThreadsRouter';
import { LogoutRouter } from './LogoutRouter';
import { DatabaseConnectionManager } from '../models/backend/database/DatabaseConnectionManager';
import * as pg from 'pg';

class MasterRouter {
    private _router = express.Router();
    private _threadRouter = ThreadRouter;
    private _commentRouter = CommentRouter;
    private _adminQueryRouter = AdminQueryRouter;
    private _loginRouter = LoginRouter;
    private _registerRouter = RegisterRouter;
    private _hotThreadsRouter = HotThreadsRouter;
    private _newThreadsRouter = NewThreadsRouter;
    private _followedThreadsRouter = FollowedThreadsRouter;
    private _logoutRouter = LogoutRouter;

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
        // this._router.use('/api/performAdminQuery', this._adminQueryRouter);
        this._router.use('/api/login', this._loginRouter);
        this._router.use('/api/register', this._registerRouter);
        this._router.use('/api/hotPosts', this._hotThreadsRouter);
        this._router.use('/api/newPosts', this._newThreadsRouter);
        this._router.use('/api/followedPosts', this._followedThreadsRouter);
        this._router.use('/api/logout', this._logoutRouter);

        this._router.post('/addPredefinedRoles', function(req, res) {
            let sqlQuery: string = "INSERT INTO \"Role\" (\"RoleName\") VALUES ('Admin');" +
                                   "INSERT INTO \"Role\" (\"RoleName\") VALUES ('Moderator');" +
                                   "INSERT INTO \"Role\" (\"RoleName\") VALUES ('Normal user');";
            
            let connection: pg.Pool = DatabaseConnectionManager.getConnection();
            connection.query(sqlQuery).then((qres) => {
                res.status(200).send("Query done!");
            }).catch((err) => {
                console.log(err)
                res.status(404).send("Not found!");
            });
        });
    }
}

export = new MasterRouter().router;