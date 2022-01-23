import {DocumentDefinition} from "mongoose";
import {omit} from "lodash";
import {UsersInput, UsersModel} from "../models/users.model";

export function createUsers(input: DocumentDefinition<UsersInput>) {
    //before creating a Users, delete all Users in the collection, to guarantee there ist only one stored at a time
    //delete all
    UsersModel.remove({});
    return UsersModel.create(input).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export function updateUsers(input: DocumentDefinition<UsersInput>) {
    return UsersModel.findOneAndUpdate({}, input).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export function getUsers() {
    return UsersModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}