import dotenv from 'dotenv';
import express from 'express';
import * as bodyParser from 'body-parser';
import MasterRouter from './routers/MasterRouter';

// Instruction to make server be able to receive requests from clients 
let app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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

let masterRouter = MasterRouter;

let server: Server = new Server();

server.app.use('/', masterRouter);

let regDateObj = new Date(Date.now());

let regDate: string = regDateObj.getUTCFullYear() + '-' +
                ('00' + (regDateObj.getUTCMonth()+1)).slice(-2) + '-' +
                ('00' + regDateObj.getUTCDate()).slice(-2) + ' 00:00:00';
console.log(regDate);

// Make the server listen on the port specified in the .env file
((port = process.env.PORT || 3000) => {
    server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();