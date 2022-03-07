import express, {Express} from "express";
import routes from "../routes";
import deserializeAdmin from "../middleware/deserializeAdmin";

export default function createServer(): Express {
    const app = express();

    app.use(express.json());
    app.use(deserializeAdmin);

    routes(app);

    return app;
}
