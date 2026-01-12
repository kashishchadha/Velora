import express from "express"
import connectDB from "./lib/connectDB.js"
import UserRouter from "./routes/user.route.js"
import CommentRouter from "./routes/comment.route.js"
import PostRouter from "./routes/post.route.js"
import webhookRoter from "./routes/webhook.route.js"
import {clerkMiddleware} from "@clerk/express"
import cors from 'cors'
const app=express()
app.use(cors(process.env.CLIENT_URL))
app.use(clerkMiddleware())
app.use("/webhooks",webhookRoter)

app.use(express.json())
app.use("/users",UserRouter)
app.use("/posts",PostRouter)
app.use("/comments",CommentRouter)

//error handler
app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        message:error.message||"somthing went wrong",
        status:error.status,
        stack:error.stack
    })
})
app.listen(3000,()=>{
    connectDB();
    console.log("server is running");
})
