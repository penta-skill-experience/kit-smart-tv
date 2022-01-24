import {DocumentDefinition} from "mongoose";
import {omit} from "lodash";
import {ConfigInput, ConfigModel} from "../models/config.model";

export async function createConfig(input: DocumentDefinition<ConfigInput>) {
    //before creating a Users, delete all Users in the collection, to guarantee there ist only one stored at a time
    //delete all
    ConfigModel.remove({});
    await ConfigModel.create(input);
    return ConfigModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export function updateConfig(input: DocumentDefinition<ConfigInput>) {
    ConfigModel.findOneAndUpdate({}, input);
    return ConfigModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export function getConfig() {
    return ConfigModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}