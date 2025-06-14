import mongoose from "mongoose";

const db = process.env.DATABASE_URI
if(!db){
    throw new Error("DATABASE_NAME environment variable is missing!");
}

const connectDB =async() =>{
    try {
        const connect_database = await mongoose.connect(db, {
            serverSelectionTimeoutMS: 3000,  // 3-second timeout
            })
        console.log("connected to the host->", connect_database.connection.name)

        return connect_database
    } catch (error) {
        console.log("Database connection error")
        process.exit(1)
    }
}

export default connectDB;