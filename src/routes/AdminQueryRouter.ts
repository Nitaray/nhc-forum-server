import * as e from 'express';
import * as pg from 'pg';
import { DatabaseConnectionManager } from '../controllers/core/DatabaseConnectionManager';

const router = e.Router();
router.post('/adminQuery/performQuery', function(req, res) {
    let sqlQuery: string = req.params.sqlQuery;

    let connection: pg.Client = DatabaseConnectionManager.getConnection();

    try {
        // perform querying
        connection.query(sqlQuery, function(err, queryRes) {
            if (err) throw err;
            // Extract result
        });
    } catch (e) {
        console.log(e);
        res.send({"error": e});
    }
});