import mongoose from "mongoose";
import config from "../config.json";

/**
 * Connects to a MongoDB database running locally.
 */
export async function connect(uri: string) {
    const dbUri = uri;
    try {
        await mongoose.connect(dbUri);
        console.log("DB connected");
    } catch (error) {
        console.log(error.message);
        console.log("Could not connect to db");
        process.exit(1);
    }
}
