"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRouter = void 0;
const express = __importStar(require("express"));
const DatabaseConnectionManager_1 = require("../controllers/core/DatabaseConnectionManager");
const UserQuerier_1 = require("../models/backend/query/UserQuerier");
const CommentQuerier_1 = require("../models/backend/query/CommentQuerier");
class CommentRouter {
    constructor() {
        this._router = express.Router();
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.get('/', (req, res, next) => {
            let commentID = +req.params.CommentID;
            let commentQuerier = new CommentQuerier_1.CommentQuerier(DatabaseConnectionManager_1.DatabaseConnectionManager.getConnection());
            let commentData = commentQuerier.getByID(commentID);
            let userQuerier = new UserQuerier_1.UserQuerier(DatabaseConnectionManager_1.DatabaseConnectionManager.getConnection());
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
exports.CommentRouter = router;
