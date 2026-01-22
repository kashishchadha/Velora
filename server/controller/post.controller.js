import Post from "../models/post.model.js"
import ImageKit from "imagekit";
import User from "../models/user.model.js";
export const getPosts=async(req,res)=>{
     const page=parseInt(req.query.page) || 1;
     const limit=parseInt(req.query.limit) || 5
     const query = {};

       const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const featured = req.query.featured;
  


  if (cat) {
    query.category = cat;
  }

  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: "i" };
  }

  if (author) {
    const user = await User.findOne({ username: author }).select("_id");

    if (!user) {
      return res.status(404).json("No post found!");
    }

    query.user = user._id;
  }

  let sortObj = { createdAt: -1 };

  if (sortQuery) {
    switch (sortQuery) {
      case "newest":
        sortObj = { createdAt: -1 };
        break;
      case "oldest":
        sortObj = { createdAt: 1 };
        break;
      case "popular":
        sortObj = { visit: -1 };
        break;
      case "trending":
        sortObj = { visit: -1 };
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
      default:
        break;
    }
  }

  if(featured){
    query.isFeatured=true
  }
  
    const posts=await Post.find(query).sort(sortObj).limit(limit).skip((page-1)*limit).populate("user","username");
    
    const totalPosts=await Post.countDocuments(query);
    const hasMore=page*limit<totalPosts;


    res.status(200).json({posts,hasMore})
}
export const getPost=async(req,res)=>{


    const post=await Post.findOne({slug:req.params.slug}).populate("user","username img");



    res.status(200).json(post)
}

export const create=async (req,res,next)=>{
    try {
         const {userId: clerkUserId}=await req.auth();
         if(!clerkUserId){
            return res.status(401).json("not authenticated")
         }
         const user=await User.findOne({clerkId: clerkUserId});
         console.log("CREATE POST - User from DB:", user);
         if(!user){
            return res.status(404).json("User not found. Please make sure your account is synced.")
         }
         
         if(!req.body.title || req.body.title.trim() === ''){
            return res.status(400).json("Title is required")
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
  res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({message: error.message || "Error creating post"});
    }
}
export const deletePost=async(req,res)=>{
     const {userId: clerkUserId, sessionClaims}=await req.auth();
         if(!clerkUserId){
            return res.status(401).json("not authenticated")
         }
         const role=sessionClaims?.publicMetadata?.role || sessionClaims?.metadata?.role || "user"
         if(role==="admin"){
            await Post.findByIdAndDelete(req.params.id);
          return  res.status(200).json("Post has been deleted");
         }
         const user=await User.findOne({clerkId: clerkUserId});
     
    const deletdpost=await Post.findByIdAndDelete({_id:req.params.id,user:user._id});
    if(!deletdpost){
        return res.status(403).json("You can only delete your own posts")
    }
    res.status(200).json("Post has been deleted");
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
export const featurePost = async (req, res) => {
  const {userId: clerkUserId, sessionClaims} = await req.auth();
  const postId = req.body.postId;

  console.log("Feature request - userId:", clerkUserId);
  console.log("Feature request - sessionClaims:", JSON.stringify(sessionClaims, null, 2));
  console.log("Feature request - postId:", postId);

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  // Try to get role from publicMetadata first, then metadata
  const role = sessionClaims?.publicMetadata?.role || sessionClaims?.metadata?.role || "user";
  console.log("Feature request - role:", role);

  if (role !== "admin") {
    return res.status(403).json("You cannot feature posts!");
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json("Post not found!");
  }

  const isFeatured = post.isFeatured;
  console.log("Current isFeatured:", isFeatured, "Will change to:", !isFeatured);

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      isFeatured: !isFeatured,
    },
    { new: true }
  );

  console.log("Post updated, new isFeatured:", updatedPost.isFeatured);
  res.status(200).json(updatedPost);
};