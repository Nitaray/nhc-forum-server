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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionManager = void 0;
const pg = __importStar(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
// load the environment variables from the .env file
dotenv_1.default.config({
    path: '.env'
});
class DatabaseConnectionManager {
    static createConnection() {
        try {
            this.connection = new pg.Client({
                host: this.url,
                user: this.username,
                password: this.password,
                database: this.dbName,
                port: 5432
            });
            this.connection.connect(function (err) {
                if (err)
                    throw err;
                console.log("Connected!");
            });
            return this.connection;
        }
        catch (e) {
            console.log('Failed to connect to database.');
            console.log(e);
        }
    }
    static getConnection() {
        if (this.connection == null)
            this.connection = this.createConnection();
        return this.connection;
    }
    static closeConnection() {
        try {
            this.connection.end(function (err) {
                if (err)
                    throw err;
                console.log('Connection closed!');
            });
            this.connection = null;
        }
        catch (e) {
            console.log('Failed to close connection.');
            console.log(e);
        }
    }
}
exports.DatabaseConnectionManager = DatabaseConnectionManager;
DatabaseConnectionManager.url = process.env.DB_URL;
DatabaseConnectionManager.username = process.env.DB_USER;
DatabaseConnectionManager.password = process.env.DB_PASS;
DatabaseConnectionManager.dbName = process.env.DB_NAME;
DatabaseConnectionManager.connection = null;
