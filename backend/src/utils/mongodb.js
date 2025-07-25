import mongoose from "mongoose";
import { MONGODB_URL } from "../config/config.js";

export const connectMongoDB = async () => {
    try {
        if (!MONGODB_URL) {
            throw new Error("MongoDB connection string is not defined in environment variables");
        }

        const connectionOptions = {
            dbName: "devtinder"
        };

        await mongoose.connect(MONGODB_URL, connectionOptions);
        console.log("MongoDB is connected successfully");
    } catch (err) {
        console.error("Error while connecting to mongodb:", err.message);
        process.exit(1);
    }
};
