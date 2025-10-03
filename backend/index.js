import express from "express"
import connectDB from "./lib/connectDB.js"
import UserRouter from "./routes/user.route.js"
import CommentRouter from "./routes/comment.route.js"
import PostRouter from "./routes/post.route.js"
import webhookRouter from "./routes/webhook.route.js"
import dotenv from "dotenv"
import cors from "cors"

import { clerkMiddleware,requireAuth } from '@clerk/express'
const app=express()
app.use(cors(process.env.CLIENT_URL));
dotenv.config()
app.use(clerkMiddleware());


// app.get("/auth-state",(req,res)=>{
//     const authState=req.auth;
//     res.json(authState);
// })

// app.get("/protect",(req,res)=>{
//     const {userId}=req.auth;
//     if(!userId){
//         return res.status(401).json("not authenticated")
//     }
//     res.status(200).json("content")
// })
app.use("/webhooks",webhookRouter)
app.use(express.json())
app.use("/users",UserRouter)
app.use("/posts",PostRouter)
app.use("/comments",CommentRouter)
//error handler becouse of this middleware i dont neet to write try and catch again and again 

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        message:error.message||"something went wrong",
        status:error.status,
        stack:error.stack,
    });
});

app.listen(3000,()=>{
    connectDB();
    console.log("server is running");
})