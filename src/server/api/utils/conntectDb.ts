import mongoose from "mongoose";
import {ensureDatabaseContent} from "./db_setup";

/**
 * Connects to a MongoDB database running locally.
 */
export async function connect(uri: string) {
    try {
        await mongoose.connect(uri);

        //ensure db is initialized
        await ensureDatabaseContent();

        console.log("DB connected");
    } catch (error) {
        console.log(error.message);
        console.log("Could not connect to db");
        process.exit(1);
    }
}
