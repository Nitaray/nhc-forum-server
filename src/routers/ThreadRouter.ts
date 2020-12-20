import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../models/backend/database/DatabaseConnectionManager';
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
                    res.status(404).send({ "Status": "Not found!" });
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

            if (title == null || content == null || userID == null || userToken == null) {
                res.status(400).send({ "Status": "Bad request!" });
                return;
            }

            let dateCreated: string = dateCreatedObj.getUTCFullYear() + '-' +
                                    ('00' + (dateCreatedObj.getUTCMonth()+1)).slice(-2) + '-' +
                                    ('00' + dateCreatedObj.getUTCDate()).slice(-2) + ' 00:00:00';

            if (!TokenManager.checkToken(userID.toString(), userToken)) {
                res.status(404).send({ "Status": "Token not found!" });
            } else {
                let threadModifier: ThreadModifier = new ThreadModifier(DatabaseConnectionManager.getConnection());
                threadModifier.add([
                    {key: "\"CreatorID\"", value: userID},
                    {key: "\"ThreadTitle\"", value: title},
                    {key: "\"Content\"", value: content},
                    {key: "\"DateCreated\"", value: dateCreated},
                ]);
                res.status(200).send({"Status": "Executed!"});
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
                res.status(200).send({ "Status": "Executed!" });
            } else {
                res.status(404).send({ "Status": "Token not found!" });
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
                res.status(200).send({ "Status": "Executed!" });
            } else {
                res.status(404).send({ "Status": "Token not found!" });
            }
        });

        this._router.post('/deleteThread', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
            let threadID: number = +req.body.ThreadID;
            let deletorID: string = req.body.DeletorID;
            let deletorToken: string = req.body.DeletorToken;

            let threadQuerier: ThreadQuerier = new ThreadQuerier(DatabaseConnectionManager.getConnection());
            threadQuerier.getThreadByID(threadID).then((qres) => {
                let creatorID = qres.getCreatorID().toString();
                let userQuerier: UserQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
                userQuerier.getRoleID(+deletorID).then((deletorRoleID) => {
                    userQuerier.getRoleID(+creatorID).then((creatorRoleID) => {
                        if (deletorID != creatorID) {
                            if (+deletorRoleID >= +creatorRoleID) {
                                res.status(403).send({ "Status": "Forbidden!" });
                                return;
                            }
                        }
    
                        //either the editorID == creatorID or roleID of editorID is 1 or 2 (Admin or Mod)
                        if (!TokenManager.checkToken(deletorID, deletorToken)) {
                            res.status(404).send({ "Status": "Not found!" });
                        } else {
                            let threadModifier: ThreadModifier = new ThreadModifier(DatabaseConnectionManager.getConnection());
                            threadModifier.remove(threadID);
                            res.status(200).send({ "Status": "Executed!" });
                        }
                    });
                });
            });
        });

        this._router.get('/searchThreadTitle', (req, res, next) => {
            let title: string = req.query.TitleToSearch as string;

            if (title == null) {
                res.status(400).send("Bad request!");
                return;
            }

            let threadQuerier: ThreadQuerier = new ThreadQuerier(DatabaseConnectionManager.getConnection());
            threadQuerier.searchThreadByTitle(title).then(qres => res.status(200).send({ "IDs": qres })).catch(err => console.log(err));
        })
    }
}

let router = new ThreadRouter().router;

export { router as ThreadRouter };