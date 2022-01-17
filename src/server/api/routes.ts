import {Express, Request, Response} from "express";
import {createAdminHandler} from "./controller/admin.controller";
import validate from "./middleware/validateResource";
import {createAdminSchema} from "./schema/admin.schema";

function routes(app: Express){
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));



    app.post("/admin", validate(createAdminSchema), createAdminHandler);
}

export default routes;