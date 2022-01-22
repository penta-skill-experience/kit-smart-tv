import {DocumentDefinition} from "mongoose";
import {WidgetDataInput, WidgetDataModel} from "../models/widgetDataModel";

export function createWidgetData(input: DocumentDefinition<WidgetDataInput>) {
    return WidgetDataModel.create(input).then(o => o.toJSON());
}

export function updateWidgetData(input: DocumentDefinition<WidgetDataInput>) {
    return WidgetDataModel.findOneAndUpdate({}, input).then(o => o.toJSON());
}