import * as mongoose from "mongoose";

export interface KvvDocument extends mongoose.Document {
    url: String;
}