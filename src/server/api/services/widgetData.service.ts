import {DocumentDefinition} from "mongoose";
import {WidgetDataInput, WidgetDataModel} from "../models/widgetDataModel";
import {omit} from "lodash";

export async function createWidgetData(input: DocumentDefinition<WidgetDataInput>) {
    //before creating a widget data list, delete all widget data list in the collection top guarantee there ist only one stored at a time
    //delete all
    await WidgetDataModel.remove({});
    await WidgetDataModel.create(input);
    return await WidgetDataModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export async function updateWidgetData(input: DocumentDefinition<WidgetDataInput>) {
    await WidgetDataModel.findOneAndUpdate({}, input);
    return await WidgetDataModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export async function getWidgetData() {
    return await WidgetDataModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}