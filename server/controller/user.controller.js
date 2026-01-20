import User from "../models/user.model.js"
export const getUserSavedPost=async (req,res)=>{
const {userId: clerkId}=await req.auth();
if(!clerkId){
    return res.status(401).json("Not Authenticated")
}
const user=await User.findOne({clerkId})
res.status(200).json(user.savedPosts);
}
export const savePost=async (req,res)=>{
const {userId: clerkId}=await req.auth();
const postId=req.body.postId;
if(!clerkId){
    return res.status(401).json("Not Authenticated")
}
const user=await User.findOne({clerkId})
const isSaved=user.savedPosts.some((p)=>p===postId);
if(!isSaved){
    await User.findByIdAndUpdate(user._id,{$push:{savedPosts:postId}});
}else{
    await User.findByIdAndUpdate(user._id,{
        $pull:{savedPosts:postId},
    });
}
setTimeout(()=>{
res.status(200).json(isSaved?"Post unsaved":"post saved")

},3000)
}