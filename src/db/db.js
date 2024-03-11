import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";




const connectDB= async()=>{
    try{
     const connectionInstance= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
     console.log(`\n MongoDb Connected !! DB HOST: ${connectionInstance.connection.host}`)
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export default connectDB;