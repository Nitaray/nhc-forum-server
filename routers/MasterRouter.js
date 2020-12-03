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
const express = __importStar(require("express"));
const ThreadRouter_1 = require("./ThreadRouter");
const CommentRouter_1 = require("./CommentRouter");
const AdminQueryRouter_1 = require("./AdminQueryRouter");
const LoginRouter_1 = require("./LoginRouter");
const RegisterRouter_1 = require("./RegisterRouter");
const HotThreadsRouter_1 = require("./HotThreadsRouter");
const NewThreadsRouter_1 = require("./NewThreadsRouter");
const FollowedThreadsRouter_1 = require("./FollowedThreadsRouter");
class MasterRouter {
    constructor() {
        this._router = express.Router();
        this._threadRouter = ThreadRouter_1.ThreadRouter;
        this._commentRouter = CommentRouter_1.CommentRouter;
        this._adminQueryRouter = AdminQueryRouter_1.AdminQueryRouter;
        this._loginRouter = LoginRouter_1.LoginRouter;
        this._registerRouter = RegisterRouter_1.RegisterRouter;
        this._hotThreadsRouter = HotThreadsRouter_1.HotThreadsRouter;
        this._newThreadsRouter = NewThreadsRouter_1.NewThreadsRouter;
        this._followedThreadsRouter = FollowedThreadsRouter_1.FollowedThreadsRouter;
        this._configure();
    }
    get router() {
        return this._router;
    }
    /**
    * Connect routes to their matching routers.
    */
    _configure() {
        this._router.use('/api/thread', this._threadRouter);
        this._router.use('/api/comment', this._commentRouter);
        this._router.use('/api/performAdminQuery', this._adminQueryRouter);
        this._router.use('/api/login', this._loginRouter);
        this._router.use('/api/register', this._registerRouter);
        this._router.use('/api/hotPosts', this._hotThreadsRouter);
        this._router.use('/api/newPosts', this._newThreadsRouter);
        this._router.use('/api/followedPosts', this._followedThreadsRouter);
    }
}
module.exports = new MasterRouter().router;
