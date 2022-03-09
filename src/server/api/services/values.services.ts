import {DocumentDefinition} from "mongoose";
import {omit} from "lodash";
import {ValuesModel} from "../models/values.model";
import {ValuesData} from "../../../shared/interfaces/interfaces";

export async function createValues(input: DocumentDefinition<ValuesData>) {
    //before creating a Users, delete all Users in the collection, to guarantee there is only one stored at a time
    //delete all
    await ValuesModel.deleteMany();
    await ValuesModel.create(input);
    return await ValuesModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export async function updateValues(input: DocumentDefinition<ValuesData>) {
    await ValuesModel.findOneAndUpdate({}, input);
    return new Promise((resolve, reject) => {
        ValuesModel.findOne({})
            .then(doc => {
                if (doc === null) {
                    reject();
                } else {
                    resolve(omit(doc.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
                }
            }).catch(() => reject());
    });
}

export async function getValues() {
    return await ValuesModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}