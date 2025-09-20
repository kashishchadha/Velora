import Post from "../models/post.model.js"
export const getPost=async(req,res)=>{
    const post=await Post.find();
    res.status(200).json(post)
}
export const getPosts=async(req,res)=>{
    const post=await Post.find({slug:req.params.slug});
    res.status(200).json(post)
}
export const createPost=async(req,res)=>{
    const newpost=new Post(req.body)
    const post=await newpost.save()
    res.status(200).json("post created")
}
export const deletePost=async(req,res)=>{
    const post=await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("post Deleted")
}