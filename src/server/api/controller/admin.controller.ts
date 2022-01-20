import {Request, Response} from "express";
import {createAdmin, validatePassword} from "../services/admin.service";
import {CreateAdminInput, updatePasswordInput} from "../schema/admin.schema";
import AdminModel from "../models/admin.model";

export async function createAdminHandler(req: Request<CreateAdminInput["body"]>, res: Response) { //req: {},{}, Request<CreateAdminInput["body"]>
    try {
        const admin = await createAdmin(req.body);
        return res.send(admin);
    } catch (e: any) {
        return res.status(409).send("CreateAdminError: E1: permitted action: admin already created");
    }
}

export async function updatePasswordHandler(req: Request<updatePasswordInput["body"]>, res: Response) {
    try {
        const admin = await validatePassword({password: req.body.password});

        if (!admin) {
            return res.status(401).send("Invalid password");
        }
        // admin in datenbank updaten

        AdminModel.findById(admin._id, function(err, doc) {
            if (err) return false;
            doc.password = req.body.new_password;
            doc.save();
        });


        return res.send("password updated")
    } catch (e: any) {
        console.log(e.message);
        return res.status(409).send(e.message);
    }
}
