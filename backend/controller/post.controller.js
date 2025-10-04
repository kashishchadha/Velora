import Post from "../models/post.model.js"
import User from "../models/user.model.js"
import ImageKit from "imagekit"
export const getPost=async(req,res)=>{
    const post=await Post.find();
    res.status(200).json(post)
}
export const getPosts=async(req,res)=>{
    const post=await Post.find({slug:req.params.slug});
    res.status(200).json(post)
}
export const createPost=async(req,res)=>{
    const clerkUserId=req.auth.userId;
    if(!clerkUserId){
        return res.status(401).json("not authenticated");
    }
    const user=await User.findOne({clerkUserId});
    if(!user){
        return res.status(404).json("User not found");
    }
    let slug=req.body.title.replace(/ /g,"-").toLowerCase();
    let existingPost=await Post.findOne({slug});
    let counter=2;
    while(existingPost){
        slug=`${slug}-${counter}`
        existingPost=await Post.findOne({slug});
        counter++;
    }
    const newpost=new Post({user:user._id,slug, ...req.body})
    const post=await newpost.save()
    res.status(200).json("post created")
}
export const deletePost=async(req,res)=>{
     const clerkUserId=req.auth.userId;
    if(!clerkUserId){
        return res.status(401).json("not authenticated");
    }
    const user=await User.findOne({clerkUserId});
    const deletdpost=await Post.findByIdAndDelete({_id:req.params.id,user:user._id});
    if(!deletdpost){
        return res.status(403).json("you can delete only your post");
    }
    res.status(200).json("post Deleted")
}
const imagekit=new ImageKit({
urlEndpoint: process.env.IK_URL_ENDPOINT,
publicKey: process.env.IK_PUBLIC_KEY,
privateKey: process.env.IK_PRIVATE_KEY,
});
export const uploadAuth=async (req,res)=>{
    const result=imagekit.getAuthenticationParameter();
    res.send(result);
}