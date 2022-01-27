import {DocumentDefinition} from "mongoose";
import {omit} from "lodash";
import {ValuesModel} from "../models/values.model";
import {ValuesData} from "../../../shared/persistence/data";

export async function createValues(input: DocumentDefinition<ValuesData>) {
    //before creating a Users, delete all Users in the collection, to guarantee there ist only one stored at a time
    //delete all
    await ValuesModel.remove({});
    await ValuesModel.create(input);
    return await ValuesModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export async function updateValues(input: DocumentDefinition<ValuesData>) {
    await ValuesModel.findOneAndUpdate({}, input);
    return await ValuesModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export async function getValues() {
    return await ValuesModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}