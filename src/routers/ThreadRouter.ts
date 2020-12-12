import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';
import { ThreadQuerier } from '../models/backend/query/ThreadQuerier';
import { UserQuerier } from '../models/backend/query/UserQuerier';
import { CommentQuerier } from '../models/backend/query/CommentQuerier';
import { Thread } from '../models/backend/component/Thread';
import { ThreadModifier } from '../models/backend/modify/ThreadModifier';
import { StringValuePair } from '../models/types/StringValuePair';
import * as bodyParser from 'body-parser';
import { TokenManager } from '../models/backend/auth/TokenManager';

class ThreadRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/getThread', (req: Request, res: Response, next: NextFunction) => {
            let threadID: number = +req.query.ThreadID;

            let threadQuerier = new ThreadQuerier(DatabaseConnectionManager.getConnection());
            threadQuerier.getThreadByID(threadID).then((threadData) => {
                if (threadData == null) {
                    res.status(404).send("Not found!");
                    return;
                }
    
                let userQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
                userQuerier.getUsername(threadData.getCreatorID()).then((authorUsername) => {
                    let commentQuerier = new CommentQuerier(DatabaseConnectionManager.getConnection());
                    commentQuerier.getCommentIDsByThreadID(threadID).then((commentIDs) => {
                        res.status(200).json({
                            AuthorID: threadData.getCreatorID(),
                            AuthorUsername: authorUsername,
                            Title: threadData.getTitle(),
                            Content: threadData.getContent(),
                            CreationDate: threadData.getDateCreated(),
                            CommentIDs: commentIDs
                        });
                    });
                });
            });
        });

        this._router.post('/createThread', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {             
            var title: string = req.body.ThreadTitle as string;
            var content: string = req.body.Content as string;
            let userID: number = +req.body.CreatorID;
            let userToken: string = req.body.UserToken;
            let dateCreatedObj: Date = new Date(Date.now());

            let dateCreated: string = dateCreatedObj.getUTCFullYear() + '-' +
                                    ('00' + (dateCreatedObj.getUTCMonth()+1)).slice(-2) + '-' +
                                    ('00' + dateCreatedObj.getUTCDate()).slice(-2) + ' 00:00:00';

            if (!TokenManager.checkToken(userID.toString(), userToken)) {
                res.status(404).send("Token not found!");
            } else {
                let threadModifier: ThreadModifier = new ThreadModifier(DatabaseConnectionManager.getConnection());
                threadModifier.add([
                    {key: "\"CreatorID\"", value: userID},
                    {key: "\"ThreadTitle\"", value: title},
                    {key: "\"Content\"", value: content},
                    {key: "\"DateCreated\"", value: dateCreated},
                ]);
                res.status(200).send("Executed!");
            }
        });

        this._router.post('/updateThreadContent', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
            let content: string = req.body.Content as string;
            let threadID: number = +req.body.ThreadID;
            let userID: string = req.body.CreatorID;
            let userToken: string = req.body.UserToken;

            if (TokenManager.checkToken(userID, userToken)) {
                let threadModifier: ThreadModifier = new ThreadModifier(DatabaseConnectionManager.getConnection());
                threadModifier.updateContent(threadID, content);
                res.status(200).send("Executed!");
            } else {
                res.status(404).send("Token not found!")
            }
        });

        this._router.post('/updateThreadTitle', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
            let title: string = req.body.ThreadTitle as string;
            let threadID: number = +req.body.ThreadID;
            let userID: string = req.body.CreatorID;
            let userToken: string = req.body.UserToken;

            if (TokenManager.checkToken(userID, userToken)) {
                let threadModifier: ThreadModifier = new ThreadModifier(DatabaseConnectionManager.getConnection());
                threadModifier.updateThreadTitle(threadID, title);
                res.status(200).send("Executed!");
            } else {
                res.status(404).send("Token not found!");
            }
        });

        this._router.post('/deleteThread', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
            let threadID: number = +req.body.ThreadID;
            let creatorID: string = req.body.CreatorID;
            let deletorID: string = req.body.DeletorID;
            let deletorToken: string = req.body.DeletorToken;

            let userQuerier: UserQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
            userQuerier.getRoleID(+deletorID).then((roleID) => {
                if (deletorID != creatorID) {
                    if (roleID == 3) {
                        res.status(404).send("Not found!");
                        return;
                    }
                }

                //either the editorID == creatorID or roleID of editorID is 1 or 2 (Admin or Mod)
                if (!TokenManager.checkToken(deletorID, deletorToken)) {
                    res.status(404).send("Not found!");
                } else {
                    let threadModifier: ThreadModifier = new ThreadModifier(DatabaseConnectionManager.getConnection());
                    threadModifier.remove(threadID);
                    res.status(200).send("Executed!");
                }
            });
        });
    }
}

let router = new ThreadRouter().router;

export { router as ThreadRouter };