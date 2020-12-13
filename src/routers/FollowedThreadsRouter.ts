import * as bodyParser from 'body-parser';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../models/backend/database/DatabaseConnectionManager';
import { TokenManager } from '../models/backend/auth/TokenManager';
import { FollowModifier } from '../models/backend/modify/FollowModifier';
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
        this._router.get('/getFollows', (req: Request, res: Response, next: NextFunction) => {
            let userID: string = req.query.UserID as string;
            let userToken: string = req.query.UserToken as string;

            if (userID == null || userToken == null) {
                res.status(400).send({ "Status": "Bad request!" });
                return;
            }

            if (!TokenManager.checkToken(userID, userToken)) {
                res.status(403).send({ "Status": "Forbidden" });
            } else {
                let threadQuerier = new ThreadQuerier(DatabaseConnectionManager.getConnection());
                let followedThreadsIDs: Array<number> = null;
                threadQuerier.getFollowedThreadsID(+userID).then((qres) => {
                    followedThreadsIDs = qres;
                    res.status(200).send({ "IDs": followedThreadsIDs });
                });
            }
        });

        this._router.post('/makeFollow', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
            let userID: string = req.body.UserID as string;
            let userToken: string = req.body.UserToken as string;
            let threadID: string = req.body.ThreadID as string;
            let followDateObj = new Date(Date.now());
            let followDate: string = followDateObj.getUTCFullYear() + '-' +
                                        ('00' + (followDateObj.getUTCMonth()+1)).slice(-2) + '-' +
                                        ('00' + followDateObj.getUTCDate()).slice(-2) + ' ' +
                                        ('00' + followDateObj.getUTCHours()).slice(-2) + ':' +
                                        ('00' + followDateObj.getUTCMinutes()).slice(-2) + ':' +
                                        ('00' + followDateObj.getUTCSeconds()).slice(-2);
            
            if (userID == null || userToken == null || threadID == undefined) {
                res.status(400).send({ "Status": "Forbidden" });
                return;
            }

            if (!TokenManager.checkToken(userID, userToken)) {
                res.status(404).send({ "Status": "Token not found!" });
            } else {
                let followModifier = new FollowModifier(DatabaseConnectionManager.getConnection());
                followModifier.add([
                    {key: "UserID", value: +userID},
                    {key: "ThreadID", value: +threadID},
                    {key: "FollowedSince", value: followDate},
                ]);
                res.status(200).send({ "Status": "Executed!" });
            }
        });
    }
}

let router = new FollowedThreadsRouter().router;

export { router as FollowedThreadsRouter };