import Post from "../models/post.model.js"
export const getPosts=async(req,res)=>{
     
    const posts=await Post.find();



    res.status(200).json(posts)
}
export const getPost=async(req,res)=>{
     
    const post=await Post.findOne({slug:req.params.slug});



    res.status(200).json(post)
}

export const create=async (req,res)=>{
  const newPost=new Post(req.body);
  const post =await newPost.save();
  res.status(200).json("post created");
}
export const deletePost=async(req,res)=>{
    const deletdpost=await Post.findByIdAndDelete({_id:req.params.id});
    res.status(200).json("deleted");
}