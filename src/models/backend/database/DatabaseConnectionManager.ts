import * as pg from 'pg';
import dotenv from 'dotenv';

// load the environment variables from the .env file
dotenv.config({
    path: '.env'
});

export class DatabaseConnectionManager {
    private static url: string = process.env.DB_URL;
    private static username: string = process.env.DB_USER;
    private static password: string = process.env.DB_PASS;
    private static dbName: string = process.env.DB_NAME;
    private static connection: pg.Pool = null;

    private static createConnection(): pg.Pool {
        try {
            this.connection = new pg.Pool({
                host: this.url,
                user: this.username,
                password: this.password,
                database: this.dbName,
                port: 5432,
                ssl: true
            });

            this.connection.connect(function(err): void {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Connected!");
            });

            return this.connection;
        } catch (e) {
            console.log('Failed to connect to database.');
            console.log(e);
        }
    }

    public static getConnection(): pg.Pool {
        if (this.connection == null)
            this.connection = this.createConnection();
        
        return this.connection;
    }

    public static closeConnection(): void {
        try {
            this.connection.end().then(() => console.log('Pool ended!'));
            this.connection = null;
        } catch (e) {
            console.log('Failed to close connection.');
            console.log(e);
        }
    }
}