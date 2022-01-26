import {DocumentDefinition} from "mongoose";
import {omit} from "lodash";
import {ConfigInput, ConfigModel} from "../models/config.model";

export async function createConfig(input: DocumentDefinition<ConfigInput>) {
    //before creating a Users, delete all Users in the collection, to guarantee there ist only one stored at a time
    //delete all
    await ConfigModel.remove({});
    await ConfigModel.create(input);
    return await ConfigModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export async function updateConfig(input: DocumentDefinition<ConfigInput>) {
    await ConfigModel.findOneAndUpdate({}, input);
    return await ConfigModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export async function getConfig() {
    return await ConfigModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}