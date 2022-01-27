import {Request, Response, NextFunction} from "express";
import {AnyZodObject} from "zod";

export function ensureRequestStructure(schema: AnyZodObject) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (e: any) {
            return res.status(410).send(e.errors);
        }
    };
}