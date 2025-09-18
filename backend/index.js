import express from "express"
import connectDB from "./lib/connectDB.js"
import UserRouter from "./routes/user.route.js"
import CommentRouter from "./routes/comment.route.js"
import PostRouter from "./routes/post.route.js"
const app=express()
app.use("/users",UserRouter)
app.use("/posts",PostRouter)
app.use("/comments",CommentRouter)
app.listen(3000,()=>{
    connectDB();
    console.log("server is running");
})