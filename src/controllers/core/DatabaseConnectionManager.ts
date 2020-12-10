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
    private static connection: pg.Client = null;

    private static createConnection(): pg.Client {
        try {
            this.connection = new pg.Client({
                host: this.url,
                user: this.username,
                password: this.password,
                database: this.dbName,
                port: 5432,
                ssl: true
            });

            this.connection.connect(function(err): void {
                if (err) throw err;
                console.log("Connected!");
            });

            return this.connection;
        } catch (e) {
            console.log('Failed to connect to database.');
            console.log(e);
        }
    }

    public static getConnection(): pg.Client {
        if (this.connection == null)
            this.connection = this.createConnection();
        
        return this.connection;
    }

    public static closeConnection(): void {
        try {
            this.connection.end(function(err) {
                if (err) throw err;
                console.log('Connection closed!');
            });
            this.connection = null;
        } catch (e) {
            console.log('Failed to close connection.');
            console.log(e);
        }
    }
}