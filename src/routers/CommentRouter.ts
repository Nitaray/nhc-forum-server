import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../models/backend/database/DatabaseConnectionManager';
import { UserQuerier } from '../models/backend/query/UserQuerier';
import { CommentQuerier } from '../models/backend/query/CommentQuerier';
import { CommentModifier } from '../models/backend/modify/CommentModifier';
import * as bodyParser from 'body-parser';
import { TokenManager } from '../models/backend/auth/TokenManager';
import { User } from '../models/backend/component/User';

class CommentRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/getComment', (req: Request, res: Response, next: NextFunction) => {
            let commentID: number = +req.query.CommentID;
        
            let commentQuerier = new CommentQuerier(DatabaseConnectionManager.getConnection());
            commentQuerier.getCommentByID(commentID).then((commentData) => {
                if (commentData == null) {
                    res.status(404).send("Not found!");
                    return;
                }

                let userQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
                userQuerier.getUsername(commentData.getCreatorID()).then((authorUsername) => {
                    res.status(200).json({
                        AuthorID: commentData.getCreatorID(),
                        AuthorUsername: authorUsername,
                        Content: commentData.getContent(),
                        CreationDate: commentData.getDateCreated()
                    });
                });
            });
        });

        this._router.post('/createComment', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
            let containingThreadID: string = req.body.ContainingThreadID;
            let content: string = req.body.Content as string;
            let dateCreatedObj: Date = new Date(Date.now());
            let userToken: string = req.body.UserToken;
            let userID: string = req.body.CreatorID;

            if (containingThreadID == null || content == null || userToken == null || userID == null) {
                res.status(400).send("Bad request!");
                return;
            }

            if (!TokenManager.checkToken(userID, userToken)) {
                res.status(403).send("Forbidden!");
            } else {
                let dateCreated: string = dateCreatedObj.getUTCFullYear() + '-' +
                                        ('00' + (dateCreatedObj.getUTCMonth()+1)).slice(-2) + '-' +
                                        ('00' + dateCreatedObj.getUTCDate()).slice(-2) + ' ' +
                                        ('00' + dateCreatedObj.getUTCHours()).slice(-2) + ':' +
                                        ('00' + dateCreatedObj.getUTCMinutes()).slice(-2) + ':' +
                                        ('00' + dateCreatedObj.getUTCSeconds()).slice(-2);

                let commentModifier: CommentModifier = new CommentModifier(DatabaseConnectionManager.getConnection());
                commentModifier.add([
                    {key: "\"Content\"", value: content},
                    {key: "\"DateCreated\"", value: dateCreated},
                    {key: "\"ContainingThreadID\"", value: containingThreadID},
                    {key: "\"CreatorID\"", value: userID}
                ]);
                res.status(200).send("Executed!");
            }
        });

        this._router.post('/updateComment', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
            let content: string = req.body.Content as string;
            let commentID: number = +req.body.CommentID;
            let userID: string = req.body.CreatorID;
            let userToken: string = req.body.UserToken;

            if (commentID == null || content == null || userToken == null || userID == null) {
                res.status(400).send("Bad request!");
                return;
            }

            //either the editorID == creatorID or roleID of editorID is 1 or 2 (Admin or Mod)
            if (!TokenManager.checkToken(userID, userToken)) {
                res.status(404).send("Token not found!");
            } else {
                let commentModifier: CommentModifier = new CommentModifier(DatabaseConnectionManager.getConnection());
                commentModifier.updateContent(commentID, content);
                res.status(200).send("Executed!");
            }
        });

        this._router.post('/deleteComment', bodyParser.json(), (req: Request, res: Response, next: NextFunction) => {
            let commentID: number = +req.body.CommentID;
            let creatorID: string = req.body.CreatorID;
            let deletorID: string = req.body.DeletorID;
            let deletorToken: string = req.body.DeletorToken;

            if (commentID == null || creatorID == null || deletorID == null || deletorToken == null) {
                res.status(400).send({"Status": "Bad request!"});
                return;
            }

            let userQuerier: UserQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
            userQuerier.getRoleID(+deletorID).then((roleID) => {
                if (deletorID != creatorID) {
                    if (roleID == 3) {
                        res.status(403).send({"Status": "Operation not permitted!"});
                        return;
                    }
                }

                //either the editorID == creatorID or roleID of editorID is 1 or 2 (Admin or Mod)
                if (!TokenManager.checkToken(deletorID, deletorToken)) {
                    res.status(404).send({"Status": "Token not found!"});
                } else {
                    let commentModifier: CommentModifier = new CommentModifier(DatabaseConnectionManager.getConnection());
                    commentModifier.remove(commentID);
                    res.status(200).send({"Status": "Executed!"});
                }
            });
        });
    }
}

let router = new CommentRouter().router;

export { router as CommentRouter };