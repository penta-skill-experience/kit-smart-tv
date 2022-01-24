import * as mongoose from "mongoose";

export interface ConfigInput {
    fontSize: string;
    colorScheme: string;
    background: string;
}

export interface ConfigDocument extends ConfigInput, mongoose.Document {
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