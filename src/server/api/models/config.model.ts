import * as mongoose from "mongoose";
import {ConfigData} from "../../../shared/persistence/data";

export interface ConfigDocument extends ConfigData, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const ConfigSchema = new mongoose.Schema({
    fontSize: {
        type: String,
        required: true,
    },
    colorScheme: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    },
}, {timestamps: true});

export const ConfigModel = mongoose.model<ConfigDocument>("Config", ConfigSchema);
