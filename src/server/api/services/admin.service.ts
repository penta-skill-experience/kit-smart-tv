import {DocumentDefinition} from "mongoose";
import {omit} from "lodash";
import {AdminModel, AdminInput} from "../models/admin.model";

export async function createAdmin(input: DocumentDefinition<AdminInput>) { // input: DocumentDefinition<AdminInput> //input: CreateAdminInput["body"]
    await AdminModel.create(input);
    const admin =  await AdminModel.findOne({name: "admin"});
    return omit(admin.toJSON(), "password");
}

export async function validatePassword(data: { password: string; }) {
    const admin = await AdminModel.findOne({name: 'admin'});
    if (!admin) {
        return false;
    }

    const isValid = await admin.comparePassword(data.password);
    if (!isValid) return false;

    return omit(admin.toJSON(), "password");
}

export async function getAdmin() {
    return AdminModel.findOne({name: 'admin'});
}


type PasswordChangeData = {
    old_password: string;
    new_password: string;
};

export async function updatePassword(data: PasswordChangeData) {
    if (!await validatePassword({password: data.old_password})) {
        return undefined;
    }
    await AdminModel.findOneAndUpdate({name: "admin"}, {password: data.new_password});
    const admin = await AdminModel.findOne({name: "admin"});
    return omit(admin.toJSON(), "password");
}