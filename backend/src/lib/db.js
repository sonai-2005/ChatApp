import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect("mongodb+srv://nandisonai848:86FhPEnJKtv2bt2U@cluster0.xcr9hpk.mongodb.net/chat_db?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`mongo db connected with--: ${conn.connection.host}`);
    } catch (error) {
        console.log("something wrong with the db.js file"+ error);
    }
}