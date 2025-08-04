import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongo db connected with--: ${conn.connection.host}`);
    } catch (error) {
        console.log("something wrong with the db.js file"+ error);
    }
}