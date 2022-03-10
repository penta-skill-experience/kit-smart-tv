import * as mongoose from "mongoose";

export interface CurlDocument extends mongoose.Document {
    url: String;
}