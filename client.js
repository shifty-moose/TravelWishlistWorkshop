import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT, clientOptions);
        console.log("Connected to the database");
        return mongoose.connection;

    } catch (error) {
        console.log("Error connecting to the database: ", error);
        return process.exit(1);
    };
};
