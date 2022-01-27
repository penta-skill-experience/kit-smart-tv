import * as mongoose from "mongoose";
import {ConfigData} from "../../../shared/persistence/data";

export interface KvvDocument extends mongoose.Document {
    url: String;
}