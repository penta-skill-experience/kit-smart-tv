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
import path from "path";

const port = config.port;

const app = express();
app.use(express.json());

// host static files of display_website and config_website
app.use("/",
    express.static(path.resolve(__dirname, "..", "display_website")));
app.use("/admin-interface",
    express.static(path.resolve(__dirname, "..", "config_website")));

app.listen(port, async () => {
    console.log(`this app is running at http://localhost:${port}`);
    await connect();

    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
    app.post("/admin", validate(createAdminSchema), createAdminHandler);
});