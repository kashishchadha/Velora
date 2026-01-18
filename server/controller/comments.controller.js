import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"
export const getPostComments= async (req,res)=>{
const comments=await Comment.find({post:req.params.postId}).populate("user","username img").sort({createdAt:-1})
res.json(comments)
}

export const addComment=async (req,res)=>{
const clerkId=req.auth.userId
const postId=req.params.postId
if(!clerkId){
    return res.status(401).json("Not authenticated")
}
const user= await User.findOne({clerkId})
const newComment=new Comment({
    ...req.body,
    user:user._id,
    post:postId,
})
setTimeout(()=>{
const savedComment=  newComment.save()
},3000)

res.status(201).json(savedComment)
}
export const deleteComment=async(req,res)=>{
const clerkId=req.auth.userId
const postId=req.params.postId
if(!clerkId){
    return res.status(401).json("Not authenticated")
}
const role=req.auth.sessionClaims?.metadata?.role||"user";
  if(role==="admin"){
            await Comment.findByIdAndDelete(req.params.id);
          return   res.status(200).json("comment has been deleted");
         }
const user=User.findOne({clerkId})
const deletedComment=await Comment.findOneAndDelete({_id:req.params.id,user:user._id})
if(!deletedComment){
    return res.status(403).json("you can delete only your comment")
}
res.status(200).json("comment Deleted")
}