import express from "express";
import routes from "../routes";
import deserializeAdmin from "../middleware/deserializeAdmin";

function createServer() {
    const app = express();

    app.use(express.json());

    app.use(deserializeAdmin);

    routes(app);

    return app;
}

export default createServer;