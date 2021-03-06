import * as mongoose from "mongoose";
import {ValuesData} from "../../../shared/interfaces/interfaces";

export interface ValuesDocument extends ValuesData, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const ValuesSchema = new mongoose.Schema({
    fontSizes: {
        type: [new mongoose.Schema({
            id: {
                type: String,
                required: true,
                unique: true,
            },
            name: {
                type: String,
                required: true,
                unique: true,
            },
            relativeSize: {
                type: Number,
                required: true,
            }
        })],
        required: true,
    },
    colorSchemes: {
        type: [new mongoose.Schema({
            id: {
                type: String,
                required: true,
                unique: true,
            },
            name: {
                type: String,
                required: true,
                unique: true,
            },
            titleFontColor: {
                type: String,
                required: true,
            },
            bodyFontColor: {
                type: String,
                required: true,
            },
            specialBoldFontColor: {
                type: String,
                required: true,
            },
            specialSubtleFontColor: {
                type: String,
                required: true,
            },
            accentBarColor: {
                type: String,
                required: true,
            },
            backgrounds: {
                type: [String],
                required: true,
            },
        })],
        required: true,
    },
}, {timestamps: true});

export const ValuesModel = mongoose.model<ValuesDocument>("Values", ValuesSchema);
