import * as express from 'express';
import * as pg from 'pg';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';
import * as bodyParser from 'body-parser';

class AdminQueryRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/retrieveData', function(req, res) {
            let sqlQuery: string = req.query.sqlQuery as string;

            let connection: pg.Pool = DatabaseConnectionManager.getConnection();

            // perform querying
            connection.query(sqlQuery).then((queryRes) => {
                // Extract result
                if (queryRes.rowCount > 0) {
                    res.status(200).json({ "QueryRes": queryRes.rows }); // send back an array with each row is a JSON object
                                                        // containing column's values, e.g. a[0].\"ThreadID\"
                } else {
                    res.status(404).send("Not found!");
                }
            }).catch(err => console.log(err));
        });

        this._router.post('/updateData', bodyParser.json(), function(req, res) {
            let sqlQuery: string = req.body.sqlQuery as string;
            // console.log(sqlQuery);

            let connection: pg.Pool = DatabaseConnectionManager.getConnection();

            // perform querying
            connection.query(sqlQuery).then((qres) => {
                res.status(200).send("Query done!");
            }).catch((err) => {
                console.log(err)
                res.status(404).send("Not found!");
            });
        });

        this._router.post('/addPredefinedRoles', function(req, res) {
            let sqlQuery: string = "INSERT INTO \"Role\" (\"RoleName\") VALUES ('Admin');" +
                                   "INSERT INTO \"Role\" (\"RoleName\") VALUES ('Moderator');" +
                                   "INSERT INTO \"Role\" (\"RoleName\") VALUES ('Normal user');";
            
            let connection: pg.Pool = DatabaseConnectionManager.getConnection();
            connection.query(sqlQuery).then((qres) => {
                res.status(200).send("Query done!");
            }).catch((err) => {
                console.log(err)
                res.status(404).send("Not found!");
            });
        })
    }
}

let router = new AdminQueryRouter().router;

export { router as AdminQueryRouter };