import {Request, Response} from "express";
import {createAdmin, updatePassword} from "../services/admin.service";
import {CreateAdminInput, updatePasswordInput} from "../schema/admin.schema";

export async function createAdminHandler(req: Request<CreateAdminInput["body"]>, res: Response) { //req: {},{}, Request<CreateAdminInput["body"]>
    try {
        const admin = await createAdmin(req.body);
        return res.send(admin);
    } catch (e: any) {
        return res.status(409).send("CreateAdminError: E1: permitted action: admin already created");
    }
}

export async function updatePasswordHandler(req: Request<updatePasswordInput["body"]>, res: Response) {
    // admin in datenbank updaten
    const updated_admin = await updatePassword({
        old_password: req.body.password,
        new_password: req.body.new_password
    })
    if (updated_admin) {
        return res.send("password updated");
    } else {
        return res.status(409).send("could not update password");
    }
}
