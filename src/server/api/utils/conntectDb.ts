import mongoose from "mongoose";
import config from "../config.json";

/**
 * Connects to a MongoDB database running locally.
 */
export async function connect() {
    const dbUri = config.dbUri;

    try {
        await mongoose.connect(dbUri);
        console.log("DB connected");
    } catch (error) {
        console.log(error.message);
        console.log("Could not connect to db");
        process.exit(1);
    }
}

/**
 * Connects to a MongoDB database running in the cloud.
 */
export async function connectRemote() {
    const uri = process.env.MONGO_URI;
    try {
    await mongoose.connect(uri);
    console.log("DB connected");
    } catch (error) {
        console.log(error.message);
        console.log("Could not connect to db");
        process.exit(1);
    }
}
