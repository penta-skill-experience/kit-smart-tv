import { Request, Response, NextFunction } from "express";

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const admin = res.locals.admin;

    if (!admin) {
        return res.sendStatus(403);
    }

    return next();
};

export default requireAdmin;