/*
This file is the entry point of the server.
Each request that reaches the server will be handled here.
 */

import * as express from "express";
import * as config from 'config';
import connect from './utils/conntectDb';
import logger from './utils/logger';
import routes from './routes'

const port = config.get<number>(`port`);

const app = express();
 app.use(express.json());

app.listen(port, async () =>{
    logger.info(`this app is running at http://localhost:${ port }`);
    await connect();
    routes(app);
});
