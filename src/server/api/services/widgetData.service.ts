import {DocumentDefinition} from "mongoose";
import {WidgetDataInput, WidgetDataModel} from "../models/widgetDataModel";
import {omit} from "lodash";

export function createWidgetData(input: DocumentDefinition<WidgetDataInput>) {
    return WidgetDataModel.create(input).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export function updateWidgetData(input: DocumentDefinition<WidgetDataInput>) {
    return WidgetDataModel.findOneAndUpdate({}, input).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}

export function getWidgetData() {
    return WidgetDataModel.findOne({}).then(o => omit(o.toJSON(), ["_id", "createdAt", "updatedAt", "__v"]));
}