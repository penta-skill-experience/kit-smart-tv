import express, {Express} from "express";
import routes from "../routes";
import deserializeAdmin from "../middleware/deserializeAdmin";
import cors from "cors";
import path from "path";

export default function createServer(): Express {
    const app = express();

    app.use(express.json());
    app.use(deserializeAdmin);

    app.use(cors());


    app.use("/",
        express.static(path.resolve(__dirname, "..", "display_website")));
    app.use("/admin-interface",
        express.static(path.resolve(__dirname, "..", "config_website")));

    routes(app);

    return app;
}
