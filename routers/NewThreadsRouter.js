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
exports.NewThreadsRouter = void 0;
const express = __importStar(require("express"));
const DatabaseConnectionManager_1 = require("../controllers/core/DatabaseConnectionManager");
const ThreadQuerier_1 = require("../models/backend/query/ThreadQuerier");
class NewThreadsRouter {
    constructor() {
        this._router = express.Router();
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.post('/', (req, res, next) => {
            let threadQuerier = new ThreadQuerier_1.ThreadQuerier(DatabaseConnectionManager_1.DatabaseConnectionManager.getConnection());
            let recentThreadIDs = threadQuerier.getRecentThreadsID();
            res.status(200).send(recentThreadIDs);
        });
    }
}
let router = new NewThreadsRouter().router;
exports.NewThreadsRouter = router;
