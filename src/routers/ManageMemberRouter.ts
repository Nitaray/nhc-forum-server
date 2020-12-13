import * as express from 'express';
import * as pg from 'pg';
import { DatabaseConnectionManager } from '../models/backend/database/DatabaseConnectionManager';
import * as bodyParser from 'body-parser';
import { UserModifier } from '../models/backend/modify/UserModifier';
import { TokenManager } from '../models/backend/auth/TokenManager';
import { User } from '../models/backend/component/User';
import { UserQuerier } from '../models/backend/query/UserQuerier';

class ManageMemberRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/getMemberUsernamesAndIDs', function(req, res) {
            let userID: string = req.query.UserID as string;
            let userToken: string = req.query.UserToken as string;
            let sqlQuery: string = "SELECT \"UserID\", \"Username\" FROM \"User\"";

            if (userID == null || userToken == null) {
                res.status(400).send({ "Status": "Bad request!" });
                return;
            }

            if (!TokenManager.checkToken(userID, userToken)) {
                res.status(400).send({ "Status": "Bad request!" });
                return;
            }

            let userQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
            userQuerier.getUserByID(+userID).then((qres) => {
                if (qres.getRoleID() == 1) {
                    let connection: pg.Pool = DatabaseConnectionManager.getConnection();

                    // perform querying
                    connection.query(sqlQuery).then((queryRes) => {
                        // Extract result
                        if (queryRes.rowCount > 0) {
                            res.status(200).json({ "QueryRes": queryRes.rows }); // send back an array with each row is a JSON object
                                                                                // containing column's values, e.g. a[0].ThreadID
                        } else {
                            res.status(404).send({ "Status": "No members!" });
                        }
                    }).catch(err => console.log(err));
                } else {
                    res.status(400).send({ "Status": "Bad request!" });
                }
            });
        });

        this._router.post('/banMember', bodyParser.json(), function(req, res) {
            let adminID: string = req.body.AdminID as string;
            let memberID: string = req.body.MemberID as string;
            let adminToken: string = req.body.AdminToken as string;

            if (adminID == null || adminToken == null || memberID == null) {
                res.status(400).send({ "Status": "Bad request!" });
                return;
            }

            if (!TokenManager.checkToken(adminID, adminToken)) {
                res.status(400).send({ "Status": "Bad request!" });
                return;
            }

            let userQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
            userQuerier.getUserByID(+adminID).then((qres) => {
                if (qres.getRoleID() == 1) {
                    let userModifier = new UserModifier(DatabaseConnectionManager.getConnection());
                    userModifier.updateStatus(+memberID, "Banned").then(() => res.status(200).send("Query done!")).catch((err) => {
                        console.log(err);
                        res.status(404).send({ "Status": "Not found!" });
                    });
                } else {
                    res.status(400).send({ "Status": "Bad request!" });
                }
            });
        });

        this._router.post('/makeMod', bodyParser.json(), function(req, res) {
            let adminID: string = req.body.AdminID as string;
            let newModID: string = req.body.NewModID as string;
            let adminToken: string = req.body.AdminToken as string;

            if (adminID == null || adminToken == null || newModID == null) {
                res.status(400).send({ "Status": "Bad request!" });
                return;
            }

            if (!TokenManager.checkToken(adminID, adminToken)) {
                res.status(400).send({ "Status": "Bad request!" });
                return;
            }

            let userQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
            userQuerier.getUserByID(+adminID).then((qres) => {
                if (qres.getRoleID() == 1) {
                    let userModifier = new UserModifier(DatabaseConnectionManager.getConnection());
                    userModifier.updateRole(+newModID, "2").then(() => res.status(200).send("Query done!")).catch((err) => {
                        console.log(err);
                        res.status(404).send({ "Status": "Not found!" });
                    });
                } else {
                    res.status(400).send({ "Status": "Bad request!" });
                }
            });
        });

        this._router.post('/takeMod', bodyParser.json(), function(req, res) {
            let adminID: string = req.body.AdminID as string;
            let oldModID: string = req.body.OldModID as string;
            let adminToken: string = req.body.AdminToken as string;

            if (adminID == null || adminToken == null || oldModID == null) {
                res.status(400).send({ "Status": "Bad request!" });
                return;
            }

            if (!TokenManager.checkToken(adminID, adminToken)) {
                res.status(400).send({ "Status": "Bad request!" });
                return;
            }

            let userQuerier = new UserQuerier(DatabaseConnectionManager.getConnection());
            userQuerier.getUserByID(+adminID).then((qres) => {
                if (qres.getRoleID() == 1) {
                    let userModifier = new UserModifier(DatabaseConnectionManager.getConnection());
                    userModifier.updateRole(+oldModID, "3").then(() => res.status(200).send("Query done!")).catch((err) => {
                        console.log(err);
                        res.status(404).send({ "Status": "Not found!" });
                    });
                } else {
                    res.status(400).send({ "Status": "Bad request!" });
                }
            });
        });
    }
}

let router = new ManageMemberRouter().router;

export { router as ManageMemberRouter };