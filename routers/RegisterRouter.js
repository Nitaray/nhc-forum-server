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
exports.RegisterRouter = void 0;
const express = __importStar(require("express"));
const DatabaseConnectionManager_1 = require("../controllers/core/DatabaseConnectionManager");
const UserModifier_1 = require("../models/backend/modify/UserModifier");
const AuthUtil_1 = require("../models/backend/auth/AuthUtil");
class RegisterRouter {
    constructor() {
        this._router = express.Router();
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.post('/', (req, res, next) => {
            let username = req.params.Username;
            let email = req.params.Email;
            let hashedPassword = AuthUtil_1.AuthUtil.hashString(req.params.Password + username);
            let regDateObj = new Date(Date.now());
            let regDate = regDateObj.getUTCFullYear() + '-' +
                ('00' + (regDateObj.getUTCMonth() + 1)).slice(-2) + '-' +
                ('00' + regDateObj.getUTCDate()).slice(-2) + ' ' +
                ('00' + regDateObj.getUTCHours()).slice(-2) + ':' +
                ('00' + regDateObj.getUTCMinutes()).slice(-2) + ':' +
                ('00' + regDateObj.getUTCSeconds()).slice(-2);
            let userModifer = new UserModifier_1.UserModifier(DatabaseConnectionManager_1.DatabaseConnectionManager.getConnection());
            userModifer.add([
                { key: "Username", value: username },
                { key: "Password", value: hashedPassword },
                { key: "Email", value: email },
                { key: "FirstName", value: "Cuong" },
                { key: "LastName", value: "Nguyen" },
                { key: "DateOfBirth", value: "01-01-1999" },
                { key: "Status", value: "Active" },
                { key: "RegistrationDate", value: regDate },
                { key: "Gender", value: "Male" },
                { key: "Country", value: "Vietnam" },
                { key: "About", value: "You can add a few lines about yourself to me at mastermind0108[at]gmail.com!" },
                { key: "RoleID", value: 3 },
            ]);
            res.status(200).send("Registration OK!");
        });
    }
}
let router = new RegisterRouter().router;
exports.RegisterRouter = router;
