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
        this._router.post('/', function(req, res) {
            let sqlQuery: string = req.params.sqlQuery;
        
            let connection: pg.Client = DatabaseConnectionManager.getConnection();
        
            try {
                // perform querying
                connection.query(sqlQuery, function(err, queryRes) {
                    if (err) throw err;
                    
                    // Extract result
                    if (queryRes.rowCount > 0)
                        res.status(200).json(queryRes.rows); //send back an array with each row is a JSON object containing column's values,
                                                // e.g. a[0].ThreadID
                });
            } catch (e) {
                console.log(e);
                res.status(500).json({"error": e});
            }
        });
    }
}

let router = new AdminQueryRouter().router;

export { router as AdminQueryRouter };