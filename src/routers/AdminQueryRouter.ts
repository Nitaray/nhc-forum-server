import * as express from 'express';
import * as pg from 'pg';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';

class AdminQueryRouter {
    private _router = express.Router();
    
    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/', function(req, res) {
            let sqlQuery: string = req.query.sqlQuery as string;

            let connection: pg.Client = DatabaseConnectionManager.getConnection();

            // perform querying
            let ok: boolean = false;
            connection.query(sqlQuery, function(err, queryRes) {
                if (err) {
                    console.log(err);
                    return;
                }
                
                // Extract result
                if (queryRes.rowCount > 0) {
                    res.status(200).json(queryRes.rows); // send back an array with each row is a JSON object
                                                        // containing column's values, e.g. a[0].\"ThreadID\"
                    ok = true;
                }
            });
            
            if (!ok) res.status(404).send("Not found!");
        });
    }
}

let router = new AdminQueryRouter().router;

export { router as AdminQueryRouter };