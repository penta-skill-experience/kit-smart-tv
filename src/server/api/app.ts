/*
This file is the entry point of the server.
Each request that reaches the server will be handled here.
 */

import express, {Request, Response} from "express";
import config from "./config.json";
import connect from './utils/conntectDb';
import validate from "./middleware/validateResource";
import {createAdminSchema} from "./schema/admin.schema";
import {createAdminHandler} from "./controller/admin.controller";

const port = config.port;

const app = express();
 app.use(express.json());

app.listen(port, async () =>{
    console.log(`this app is running at http://localhost:${ port }`);
    await connect();

    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
    app.post("/admin", validate(createAdminSchema), createAdminHandler);
});