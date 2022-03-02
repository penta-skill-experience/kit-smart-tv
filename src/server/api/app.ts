/*
This file is the entry point of the server.
Each request that reaches the server will be handled here.
 */

import express from "express";
import config from "./config.json";
import {connect} from './utils/conntectDb';
import path from "path";
import 'dotenv/config';
import cors from "cors";
import {AnnouncementMailListener} from "../email_announcement_interaction/AnnouncementMailListener"
import https from 'https';
import createServer from "./utils/server";

serverSetup(process.env.MONGO_URI);


export function serverSetup(dbUri: string): https.Server {
    const mail = new AnnouncementMailListener;
    mail.createMailListener();

    const port = config.port;

    const app = createServer();

    app.use(cors());


    app.use("/",
        express.static(path.resolve(__dirname, "..", "display_website")));
    app.use("/admin-interface",
        express.static(path.resolve(__dirname, "..", "config_website")));

    const sslServer = https.createServer(
        {
            key: process.env.HTTPS_KEY,
            cert: process.env.HTTPS_CERT,
        },
        app
    )

    sslServer.listen(port, async () => {
        await connect(dbUri);
        console.log(`this app is running at https://localhost:${port}`)
    })

    return sslServer;
}