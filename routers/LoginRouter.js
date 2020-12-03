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
exports.LoginRouter = void 0;
const express = __importStar(require("express"));
const DatabaseConnectionManager_1 = require("../controllers/core/DatabaseConnectionManager");
const UserAuthenticator_1 = require("../models/backend/auth/UserAuthenticator");
const UserQuerier_1 = require("../models/backend/query/UserQuerier");
class LoginRouter {
    constructor() {
        this._router = express.Router();
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.post('/', (req, res, next) => {
            let password = req.params.Password;
            let username = req.params.Username;
            let ck_pwd = UserAuthenticator_1.UserAuthenticator.auth(username, password);
            if (ck_pwd) {
                let userQuerier = new UserQuerier_1.UserQuerier(DatabaseConnectionManager_1.DatabaseConnectionManager.getConnection());
                let userID = userQuerier.getID(username).toString();
                res.status(200).send("Auth OK\nUser ID: " + userID);
            }
            else {
                res.status(406).send("Auth ERROR, recheck username and password!");
            }
        });
    }
}
let router = new LoginRouter().router;
exports.LoginRouter = router;
