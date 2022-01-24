import {DocumentDefinition} from "mongoose";
import {WidgetDataInput, WidgetDataModel} from "../models/widgetDataModel";
import {omit} from "lodash";

export function createWidgetData(input: DocumentDefinition<WidgetDataInput>) {
    //before creating a widget data list, delete all widget data list in the collection top guarantee there ist only one stored at a time
    //delete all
    WidgetDataModel.remove({});
    return WidgetDataModel.create(input).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export function updateWidgetData(input: DocumentDefinition<WidgetDataInput>) {
    return WidgetDataModel.findOneAndUpdate({}, input).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export function getWidgetData() {
    return WidgetDataModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}