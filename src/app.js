import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app=express();


app.use(cors({
    origin:process.env.CORS_OPTIONS,
    credentials:true
}))

//for json data
app.use(express.json({
    limit:"20kb"
}))

//for url data
app.use(express.urlencoded({extended:true,limit:"20kb"}))

//for serving static files like css, etc
app.use(express.static("public"))

export {app}