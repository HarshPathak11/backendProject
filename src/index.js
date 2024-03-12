// require('dotenv').config({path: './env'});
import dotenv from 'dotenv'
import connectDB from "./db/db.js";


dotenv.config(
    {
        path:'./env'
    }
)

connectDB()
.then(()=>{
    app.listen(process.env.PORT||4000,()=>{
        console.log(`Server running on http://localhost:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongo DB Connection failed !!!",err)
})




/*
//First Approch to connect DB
import express from 'express'
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
const app=express();
(async()=>{
    try {
       await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       app.on("error",(err)=>{
        console.log(err);
        throw err;})
       app.listen(process.env.PORT,()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`)
       })       
    } catch (error) {
        console.log(error);
        throw error;
    }
})()
*/