import Post from "../models/post.model.js"
import ImageKit from "imagekit";
import User from "../models/user.model.js";
export const getPosts=async(req,res)=>{
     const page=parseInt(req.query.page) || 1;
     const limit=parseInt(req.query.limit) || 5
    const posts=await Post.find().limit(limit).skip((page-1)*limit).populate("user","username");
    const totalPosts=await Post.countDocuments();
    const hasMore=page*limit<totalPosts;


    res.status(200).json({posts,hasMore})
}
export const getPost=async(req,res)=>{


    const post=await Post.findOne({slug:req.params.slug}).populate("user","username img");



    res.status(200).json(post)
}

export const create=async (req,res,next)=>{
    try {
         console.log("Create post called");
         const {userId: clerkUserId}=await req.auth();
         console.log("Clerk User ID:", clerkUserId);
         if(!clerkUserId){
            return res.status(401).json("not authenticated")
         }
         const user=await User.findOne({clerkId: clerkUserId});
         console.log("User found:", user);
         if(!user){
            return res.status(404).json("User not found. Please make sure your account is synced.")
         }
         let slug=req.body.title.replace(/ /g,"-").toLowerCase();
         let existingPost=await Post.findOne({slug});
         let counter=2;
         while(existingPost){
            slug=`${slug}-${counter}`;
            existingPost=await Post.findOne({slug});
            counter++;
         }
  const newPost=new Post({user:user._id,slug,...req.body});
  const post =await newPost.save();
  console.log("Post created successfully");
  res.status(200).json("post created");
    } catch (error) {
        console.error("Error creating post:", error);
        next(error);
    }
}
export const deletePost=async(req,res)=>{
     const {userId: clerkUserId}=await req.auth();
         if(!clerkUserId){
            return res.status(401).json("not authenticated")
         }
         const role=req.auth.sessionClaims?.metadata?.role || "user"
         if(role==="admin"){
            await Post.findByIdAndDelete(req.params.id);
          return  res.status(200).json("Post has been deleted");
         }
         const user=await User.findOne({clerkId: clerkUserId});
     
    const deletdpost=await Post.findByIdAndDelete({_id:req.params.id,user:user._id});
    if(!deletdpost){
        return res.status(403).json("you can delete your post")
    }
    res.status(200).json(" post has been deleted");
}

const imagekit=new ImageKit({
urlEndpoint: process.env.IK_URL_ENDPOINT,
publicKey: process.env.IK_PUBLIC_KEY,
privateKey: process.env.IK_PRIVATE_KEY,
});

export const uploadAuth= async (req,res)=>{
        const result = imagekit.getAuthenticationParameters();
res.send(result);
}