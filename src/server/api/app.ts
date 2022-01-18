/*
This file is the entry point of the server.
Each request that reaches the server will be handled here.
 */

import express from "express";
import config from "./config.json";
import connect from './utils/conntectDb';
import routes from './routes'

const port = config.port;

const app = express();
 app.use(express.json());

app.listen(port, async () =>{
    console.log(`this app is running at http://localhost:${ port }`);
    await connect();
    routes(app);
});
