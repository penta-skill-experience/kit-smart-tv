import {Express, Request, Response} from "express";
import {ensureRequestStructure} from "./middleware/ensureRequestStructure";
import {createAdminSchema, updatePasswordSchema} from "./schema/admin.schema";
import {createAdminHandler, updatePasswordHandler} from "./controller/admin.controller";
import requireAdmin from "./middleware/requireAdmin";
import {createSessionSchema} from "./schema/session.schema";
import {createAdminSessionHandler, deleteSessionHandler, getSessionHandler} from "./controller/session.controller";
import {getWidgetDataHandler, updateWidgetDataHandler} from "./controller/widget.controller";
import {updateWidgetSchema} from "./schema/widgetData.schema";
import {getAnnouncementsHandler} from "./controller/announcements.controller";
import {updateUsersSchema} from "./schema/users.schema";
import {getUsersHandler, updateUsersHandler} from "./controller/users.controller";
import {updateConfigSchema} from "./schema/config.schema";
import {getConfigHandler, updateConfigHandler} from "./controller/config.controller";
import {updateValuesSchema} from "./schema/values.schema";
import {getValuesHandler, updateValuesHandler} from "./controller/values.controller";
import {putKvvSchema} from "./schema/kvv.schema";
import {putKvvHandler} from "./controller/kvv.controller";

function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

    /**
     *   Admin Routes
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
    app.get("/announcements", getAnnouncementsHandler);

    /**
     *   verified User Routines
     **/
    app.put("/users", requireAdmin, ensureRequestStructure(updateUsersSchema), updateUsersHandler);
    app.get("/users", getUsersHandler);

    /**
     *   Config Routines
     **/
    app.put("/config", requireAdmin, ensureRequestStructure(updateConfigSchema), updateConfigHandler);
    app.get("/config", getConfigHandler);


    /**
     *   Values Routines
     **/
    app.put("/values", requireAdmin, ensureRequestStructure(updateValuesSchema), updateValuesHandler);
    app.get("/values", getValuesHandler);

    app.put("/kvv", ensureRequestStructure(putKvvSchema), putKvvHandler);

}

export default routes;















