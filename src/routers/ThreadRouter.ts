import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';
import { ThreadQuerier } from '../models/backend/query/ThreadQuerier';
import { UserQuerier } from '../models/backend/query/UserQuerier';
import { CommentQuerier } from '../models/backend/query/CommentQuerier';
import { Thread } from '../models/backend/component/Thread';

class ThreadRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
            let threadID: number = +req.params.ThreadID;
        
            let threadQuerier = new ThreadQuerier(DatabaseConnectionManager.getConnection());
            let threadData = threadQuerier.getThreadByID(threadID);
        
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
    }
}

let router = new ThreadRouter().router;

export { router as ThreadRouter };