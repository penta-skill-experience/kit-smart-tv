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
    );

    sslServer.listen(port, async () => {
        await connect(dbUri);
        console.log(`this app is running at https://localhost:${port}`)
    });

    return sslServer;
}