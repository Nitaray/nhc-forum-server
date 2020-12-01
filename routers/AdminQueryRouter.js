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
exports.AdminQueryRouter = void 0;
const express = __importStar(require("express"));
const DatabaseConnectionManager_1 = require("../controllers/core/DatabaseConnectionManager");
class AdminQueryRouter {
    constructor() {
        this._router = express.Router();
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.post('/', function (req, res) {
            let sqlQuery = req.params.sqlQuery;
            let connection = DatabaseConnectionManager_1.DatabaseConnectionManager.getConnection();
            try {
                // perform querying
                connection.query(sqlQuery, function (err, queryRes) {
                    if (err)
                        throw err;
                    // Extract result
                    if (queryRes.rowCount > 0)
                        res.status(200).json(queryRes.rows); //send back an array with each row is a JSON object containing column's values,
                    // e.g. a[0].ThreadID
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ "error": e });
            }
        });
    }
}
let router = new AdminQueryRouter().router;
exports.AdminQueryRouter = router;
