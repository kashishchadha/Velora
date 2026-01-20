import express from "express"
import { getPosts,getPost ,create,deletePost,uploadAuth,featurePost} from "../controller/post.controller.js";
import increaseVisit from "../middleware/increaseVist.js";
const router=express.Router();
router.get("/upload-auth",uploadAuth)
router.get("/",getPosts)
router.post("/",create)
router.get("/:slug",increaseVisit,getPost)
router.delete("/:id",deletePost)
router.patch("/feature",featurePost)
export default router;