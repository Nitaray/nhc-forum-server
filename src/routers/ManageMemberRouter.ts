import * as express from 'express';
import * as pg from 'pg';
import { DatabaseConnectionManager } from '../models/backend/database/DatabaseConnectionManager';
import * as bodyParser from 'body-parser';
import { UserModifier } from '../models/backend/modify/UserModifier';

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
            let sqlQuery: string = "SELECT \"UserID\", \"Username\" FROM \"User\"";

            let connection: pg.Pool = DatabaseConnectionManager.getConnection();

            // perform querying
            connection.query(sqlQuery).then((queryRes) => {
                // Extract result
                if (queryRes.rowCount > 0) {
                    res.status(200).json({ "QueryRes": queryRes.rows }); // send back an array with each row is a JSON object
                                                                        // containing column's values, e.g. a[0].\"ThreadID\"
                } else {
                    res.status(404).send("No members!");
                }
            }).catch(err => console.log(err));
        });

        this._router.post('/banMember', bodyParser.json(), function(req, res) {
            let userID: string = req.body.UserID as string;
            // console.log(sqlQuery);

            if (userID == null) {
                res.status(400).send("Bad request!");
                return;
            }

            let userModifier = new UserModifier(DatabaseConnectionManager.getConnection());
            userModifier.updateStatus(+userID, "Banned").then(() => res.status(200).send("Query done!")).catch((err) => {
                console.log(err);
                res.status(404).send("Not found!");
            });
        });

        this._router.post('/makeMod', bodyParser.json(), function(req, res) {
            let userID: string = req.body.UserID as string;
            // console.log(sqlQuery);

            if (userID == null) {
                res.status(400).send("Bad request!");
                return;
            }

            let userModifier = new UserModifier(DatabaseConnectionManager.getConnection());
            userModifier.updateRole(+userID, "2").then(() => res.status(200).send("Query done!")).catch((err) => {
                console.log(err);
                res.status(404).send("Not found!");
            });
        });

        this._router.post('/takeMod', bodyParser.json(), function(req, res) {
            let userID: string = req.body.UserID as string;
            // console.log(sqlQuery);

            if (userID == null) {
                res.status(400).send("Bad request!");
                return;
            }

            let userModifier = new UserModifier(DatabaseConnectionManager.getConnection());
            userModifier.updateRole(+userID, "3").then(() => res.status(200).send("Query done!")).catch((err) => {
                console.log(err);
                res.status(404).send("Not found!");
            });
        });
    }
}

let router = new ManageMemberRouter().router;

export { router as ManageMemberRouter };