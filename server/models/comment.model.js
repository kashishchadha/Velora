import { Schema } from "mongoose";
import mongoose from "mongoose";
const commentModel=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post",
        required:true
    }
},{timestamps:true})
export default mongoose.model("Comment",commentModel)