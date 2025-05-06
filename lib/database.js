import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "nexcis_project",
        });

        isConnected = true;
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}