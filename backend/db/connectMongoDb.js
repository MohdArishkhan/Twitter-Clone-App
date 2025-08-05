import mongoose from "mongoose";
import dotenv from'dotenv';
dotenv.config();

const connectMongoDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected:${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connection to MongoDb:${error.message}`);
        process.exit();
    }
}
export default connectMongoDb;