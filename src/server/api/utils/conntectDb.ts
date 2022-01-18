import mongoose from "mongoose";
import config from "../config.json";

async function connect() {
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

export default connect;