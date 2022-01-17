import {DocumentDefinition} from "mongoose";
import {omit} from "lodash";
import AdminModel, {AdminInput} from "../models/admin.model";

export async function createAdmin(input: DocumentDefinition<AdminInput> ) { // input: DocumentDefinition<AdminInput> //input: CreateAdminInput["body"]
    try {
        const admin = await AdminModel.create(input);

        return omit(admin.toJSON(), "password");
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function validatePassword({
                                           password,
                                       }: {
    password: string;
}) {
    const admin = await AdminModel.findOne({name: 'admin'});

    if (!admin) {
        return false;
    }

    const isValid = await admin.comparePassword(password);

    if (!isValid) return false;

    return omit(admin.toJSON(), "password");
}

export async function updatePassword() {}