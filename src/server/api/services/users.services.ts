import {DocumentDefinition} from "mongoose";
import {omit} from "lodash";
import {UsersInput, UsersModel} from "../models/users.model";

export async function createUsers(input: DocumentDefinition<UsersInput>) {
    //before creating a Users, delete all Users in the collection, to guarantee there ist only one stored at a time
    //delete all
    await UsersModel.remove({});
    await UsersModel.create(input);
    return await UsersModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export async function updateUsers(input: DocumentDefinition<UsersInput>) {
    await UsersModel.findOneAndUpdate({}, input);
    return await UsersModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]))
}

export async function getUsers() {
    return await UsersModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}