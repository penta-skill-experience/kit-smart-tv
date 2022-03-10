import https from "https";
import {AnnouncementMailListener} from "../email_announcement_interaction/AnnouncementMailListener";
import config from "./config.json";
import createServer from "./utils/server";
import cors from "cors";
import express from "express";
import path from "path";
import {connect} from "./utils/conntectDb";

export function serverSetup(dbUri: string): https.Server {
    const mail = new AnnouncementMailListener;
    mail.createMailListener();
    const app = createServer();
    const sslServer = https.createServer(
        {
            key: process.env.HTTPS_KEY,
            cert: process.env.HTTPS_CERT,
        },
        app
    );

    sslServer.listen(config.port, async () => {
        await connect(dbUri);
        console.log(`this app is running at https://localhost:${config.port}`)
    });

    return sslServer;
}