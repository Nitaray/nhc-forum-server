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
class MasterRouter {
    constructor() {
        this._router = express.Router();
        this._threadRouter = ThreadRouter_1.ThreadRouter;
        this._commentRouter = CommentRouter_1.CommentRouter;
        this._adminQueryRouter = AdminQueryRouter_1.AdminQueryRouter;
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
        this._router.use('/api/adminQuery/performQuery', this._adminQueryRouter);
    }
}
module.exports = new MasterRouter().router;
