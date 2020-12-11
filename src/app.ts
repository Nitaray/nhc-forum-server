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

// Make the server listen on the port specified in the .env file
((port = process.env.PORT || 3000) => {
    server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();