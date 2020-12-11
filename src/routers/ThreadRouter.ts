import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';
import { ThreadQuerier } from '../models/backend/query/ThreadQuerier';
import { UserQuerier } from '../models/backend/query/UserQuerier';
import { CommentQuerier } from '../models/backend/query/CommentQuerier';
import { Thread } from '../models/backend/component/Thread';
import { ThreadModifier } from '../models/backend/modify/ThreadModifier';
import { StringValuePair } from '../models/types/StringValuePair';

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
            let threadData = threadQuerier.getThreadByID(threadID);

            if (threadData == null) {
                res.status(404).send("Not found!");
                return;
            }

            let userQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
            let authorUsername = userQuerier.getUsername(threadData.getCreatorID());
        
            let commentQuerier = new CommentQuerier(DatabaseConnectionManager.getConnection());
            let commentIDs = commentQuerier.getCommentIDsByThreadID(threadID);
        
            res.status(200).json({
                AuthorID: threadData.getCreatorID(),
                AuthorUsername: authorUsername,
                Title: threadData.getTitle(),
                Content: threadData.getContent(),
                CreationDate: threadData.getDateCreated(),
                CommentIDs: commentIDs
            });
        });

        this._router.post('/createThread', (req: Request, res: Response, next: NextFunction) => {            
            var title: string = req.query.ThreadTitle as string;
            var content: string = req.query.Content as string;
            var dateCreatedObj: Date = new Date(Date.now());

            let dateCreated: string = dateCreatedObj.getUTCFullYear() + '-' +
                                    ('00' + (dateCreatedObj.getUTCMonth()+1)).slice(-2) + '-' +
                                    ('00' + dateCreatedObj.getUTCDate()).slice(-2) + ' 00:00:00';

            let threadModifier: ThreadModifier = new ThreadModifier(DatabaseConnectionManager.getConnection());
            threadModifier.add([
                {key: "\"ThreadTitle\"", value: title},
                {key: "\"Content\"", value: content},
                {key: "\"DateCreated\"", value: dateCreated},
            ]);
        });

        this._router.post('/updateThreadContent', (req: Request, res: Response, next: NextFunction) => {
            var content: string = req.query.Content as string;
            var threadID: number = +req.query.ThreadID;

            let threadModifier: ThreadModifier = new ThreadModifier(DatabaseConnectionManager.getConnection());
            threadModifier.updateContent(threadID, content);
        });

        this._router.post('/updateThreadTitle', (req: Request, res: Response, next: NextFunction) => {
            var title: string = req.query.ThreadTitle as string;
            var threadID: number = +req.query.ThreadID;

            let threadModifier: ThreadModifier = new ThreadModifier(DatabaseConnectionManager.getConnection());
            threadModifier.updateThreadTitle(threadID, title);
        });

        this._router.post('/updateThreadCreator', (req: Request, res: Response, next: NextFunction) => {
            var creatorID: number = +req.query.CreatorID;
            var threadID: number = +req.query.ThreadID;

            let threadModifier: ThreadModifier = new ThreadModifier(DatabaseConnectionManager.getConnection());
            threadModifier.updateCreatorID(threadID, creatorID);
        });
    }
}

let router = new ThreadRouter().router;

export { router as ThreadRouter };