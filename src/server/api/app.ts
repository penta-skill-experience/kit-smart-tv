/*
This file is the entry point of the server.
Each request that reaches the server will be handled here.
 */

import express, {Request, Response} from "express";
import config from "./config.json";
import {connectRemote} from './utils/conntectDb';
import {createAdminSchema, updatePasswordSchema} from "./schema/admin.schema";
import {createAdminHandler, updatePasswordHandler} from "./controller/admin.controller";
import path from "path";
import {createAdminSessionHandler, deleteSessionHandler, getSessionHandler} from "./controller/session.controller";
import {createSessionSchema} from "./schema/session.schema";
import deserializeAdmin from "./middleware/deserializeAdmin";
import requireAdmin from "./middleware/requireAdmin";
import 'dotenv/config';
import {ensureRequestStructure} from "./middleware/ensureRequestStructure";
import {updateWidgetSchema} from "./schema/widgetData.schema";
import {getWidgetDataHandler, updateWidgetDataHandler} from "./controller/widget.controller";
import {updateAnnouncementsSchema} from "./schema/announcements.schema";
import {getAnnouncementsHandler, updateAnnouncementsHandler} from "./controller/announcements.controller";

const port = config.port;

const app = express();
app.use(express.json());
app.use(deserializeAdmin);

// host static files of display_website and config_website
app.use("/",
    express.static(path.resolve(__dirname, "..", "display_website")));
app.use("/admin-interface",
    express.static(path.resolve(__dirname, "..", "config_website")));

app.listen(port, async () => {
    console.log(`this app is running at http://localhost:${port}`);
    await connectRemote();

    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

/**
 *   Admin Routines
 **/
    app.post("/admin/create-admin", ensureRequestStructure(createAdminSchema), createAdminHandler);

    app.put("/admin/update-password", requireAdmin, ensureRequestStructure(updatePasswordSchema), updatePasswordHandler);

/**
 *   Session Routines
 **/
    app.post(
        "/api/sessions",
        ensureRequestStructure(createSessionSchema),
        createAdminSessionHandler
    );

    app.get("/api/sessions", requireAdmin, getSessionHandler);

    app.delete("/api/sessions", requireAdmin, deleteSessionHandler);

/**
*   Widget Routines
**/
    app.get("/widgets", getWidgetDataHandler);

    app.put("/widgets", requireAdmin, ensureRequestStructure(updateWidgetSchema), updateWidgetDataHandler);

/**
 *   Announcement Routines
 **/

    //hier braucht man noch mmiddle ware die nur locale calls zulässt.
    app.put("/announcements", ensureRequestStructure(updateAnnouncementsSchema), updateAnnouncementsHandler)

    app.get("/announcements", getAnnouncementsHandler)

});