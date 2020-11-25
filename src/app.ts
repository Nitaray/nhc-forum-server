import dotenv from 'dotenv';
import express from 'express';
import { Request, Response, NextFunction } from 'express';

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
    public app = express();
}
  
// initialize server app
// const server = new Server();

let readDate: Date = new Date();
let s: string = readDate.getUTCFullYear() + '-' +
('00' + (readDate.getUTCMonth()+1)).slice(-2) + '-' +
('00' + readDate.getUTCDate()).slice(-2) + ' ' + 
('00' + readDate.getUTCHours()).slice(-2) + ':' + 
('00' + readDate.getUTCMinutes()).slice(-2) + ':' + 
('00' + readDate.getUTCSeconds()).slice(-2);
console.log(s);

// make server listen on some port
// ((port = process.env.APP_PORT) => {
//   server.app.listen(port, () => console.log(`> Listening on port ${port}`));
// })();