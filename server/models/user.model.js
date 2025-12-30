import mongoose from "mongoose"
import { Schema } from "mongoose"
import { type } from "os";
const userSchema= new Schema(
    {
   
        username:{
            type:String,
            required:true,
            unique:true
        },
      email:{
            type:String,
            required:true,
            unique:true
      },
      img:{
            type:String,
        
      },
      savedPosts:{
        type:[String],
        default:[],
      },
    },{timestamps:true}
);
export default mongoose.model("User",userSchema)