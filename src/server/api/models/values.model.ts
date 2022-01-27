import * as mongoose from "mongoose";
import {ValuesData} from "../../../shared/persistence/data";

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
            relativeHeight: {
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
            titleColor: {
                type: String,
                required: true,
            },
            bodyColor: {
                type: String,
                required: true,
            },
            specialBoldColor: {
                type: String,
                required: true,
            },
            specialSubtleColor: {
                type: String,
                required: true,
            },
            accentBarColor: {
                type: String,
                required: true,
            },
            backgrounds: {
                type: [new mongoose.Schema({
                    id: {
                        type: String,
                        required: true,
                        unique: true,
                    },
                    url: {
                        type: String,
                        required: true,
                    }
                })],
                required: true,
            },
        })],
        required: true,
    },
}, {timestamps: true});

export const ValuesModel = mongoose.model<ValuesDocument>("Values", ValuesSchema);
