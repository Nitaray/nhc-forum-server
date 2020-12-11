import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';
import { UserQuerier } from '../models/backend/query/UserQuerier';
import { CommentQuerier } from '../models/backend/query/CommentQuerier';
import { CommentModifier } from '../models/backend/modify/CommentModifier';

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
            let commentData = commentQuerier.getCommentByID(commentID);

            if (commentData == null) {
                res.status(404).send("Not found!");
                return;
            }

            let userQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
            let authorUsername = userQuerier.getUsername(commentData.getCreatorID());
        
            res.status(200).json({
                AuthorID: commentData.getCreatorID(),
                AuthorUsername: authorUsername,
                Content: commentData.getContent(),
                CreationDate: commentData.getDateCreated()
            });
        });

        this._router.post('/createComment', (req: Request, res: Response, next: NextFunction) => {
            var content: string = req.query.Content as string;
            var dateCreatedObj: Date = new Date(Date.now());

            let dateCreated: string = dateCreatedObj.getUTCFullYear() + '-' +
                                    ('00' + (dateCreatedObj.getUTCMonth()+1)).slice(-2) + '-' +
                                    ('00' + dateCreatedObj.getUTCDate()).slice(-2) + ' 00:00:00';

            let commentModifier: CommentModifier = new CommentModifier(DatabaseConnectionManager.getConnection());
            commentModifier.add([
                {key: "\"Content\"", value: content},
                {key: "\"DateCreated\"", value: dateCreated},
            ]);
        });

        this._router.post('/updateComment', (req: Request, res: Response, next: NextFunction) => {
            var content: string = req.query.Content as string;
            var commentID: number = +req.query.CommentID;

            let commentModifier: CommentModifier = new CommentModifier(DatabaseConnectionManager.getConnection());
            commentModifier.updateContent(commentID, content);
        });
    }
}

let router = new CommentRouter().router;

export { router as CommentRouter };