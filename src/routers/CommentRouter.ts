import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';
import { UserQuerier } from '../models/backend/query/UserQuerier';
import { CommentQuerier } from '../models/backend/query/CommentQuerier';
import { Comment } from '../models/backend/component/Comment';

class CommentRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
            let commentID: number = +req.params.CommentID;
        
            let commentQuerier = new CommentQuerier(DatabaseConnectionManager.getConnection());
            let commentData = commentQuerier.getByID(commentID) as Comment;
        
            let userQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
            let authorUsername = userQuerier.getUsername(commentData.getCreatorID());
        
            res.status(200).json({
                AuthorID: commentData.getCreatorID(),
                AuthorUsername: authorUsername,
                Content: commentData.getContent(),
                CreationDate: commentData.getDateCreated()
            });
        });
    }
}

let router = new CommentRouter().router;

export { router as CommentRouter };