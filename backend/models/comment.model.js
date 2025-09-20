import mongoose from "mongoose"
import { Schema } from "mongoose"
const commentSchema= new Schema()(
    {
        desc:{
            type:String,
            required:true,
           
        },
          user:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
          user:{
            type:Schema.Types.ObjectId,
            ref:"Post",
            required:true,
        },

    },{timestamps:true}
);
export default mongoose.model("Comment",commentSchema)