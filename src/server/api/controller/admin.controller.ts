import {Request, Response} from "express";
import logger from '../utils/logger';
import {createAdmin} from "../services/admin.service";
import {CreateAdminInput, updatePasswordInput} from "../schema/admin.schema";

export async function createAdminHandler(req: Request<CreateAdminInput["body"]>, res: Response) { //req: {},{}, Request<CreateAdminInput["body"]>
    try {
        const admin = await createAdmin(req.body);
        return res.send(admin);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(409).send("CreateAdminError: E1: permitted action: admin already created");
    }
}

export function changePasswordHandler(req: Request<updatePasswordInput["body"]>, res: Response) {
    try {


        //return res.send("password updated")
    } catch (e: any) {
        logger.error(e.message);
        return res.status(409).send(e.message);
    }
}
