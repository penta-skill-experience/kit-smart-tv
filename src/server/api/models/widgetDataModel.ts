import * as mongoose from "mongoose";

export interface WidgetDataDocument {
    createdAt: Date;
    updatedAt: Date;
}

const widgetDataSchema = new mongoose.Schema({
    widgetDataList: {
        type: [new mongoose.Schema({
            widgetId: {
                type: String,
                required: true,
            },
            location: {
                type: Number,
                required: true,
            },
            rawConfig: {
                type: Object,
                required: false,
            },
        })],
        required: true,
    }
}, {timestamps: true});

export const WidgetDataModel = mongoose.model<WidgetDataDocument>("WidgetData", widgetDataSchema);
