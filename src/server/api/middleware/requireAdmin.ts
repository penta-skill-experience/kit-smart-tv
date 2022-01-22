import { Request, Response, NextFunction } from "express";
import {get} from "lodash";
import {isValidSession} from "../services/session.service";

const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const admin = res.locals.admin;

    if (!admin) {
        return res.sendStatus(403);
    }

    if(!await isValidSession(get(admin, "session"))) return res.sendStatus(403);


    return next();
};

export default requireAdmin;