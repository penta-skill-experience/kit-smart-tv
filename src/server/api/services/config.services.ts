import {DocumentDefinition} from "mongoose";
import {omit} from "lodash";
import {ConfigModel} from "../models/config.model";
import {ConfigData} from "../../../shared/interfaces/interfaces";

export async function createConfig(input: DocumentDefinition<ConfigData>) {
    //delete all
    await ConfigModel.deleteMany();
    await ConfigModel.create(input);
    return await ConfigModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export async function updateConfig(input: DocumentDefinition<ConfigData>) {
    await ConfigModel.findOneAndUpdate({}, input);
    return await ConfigModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export async function getConfig() {
    return await ConfigModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}