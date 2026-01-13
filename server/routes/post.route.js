import express from "express"
import { getPosts,getPost ,create,deletePost,uploadAuth} from "../controller/post.controller.js";
const router=express.Router();
router.get("/upload-auth",uploadAuth)
router.get("/",getPosts)
router.post("/",create)
router.get("/:slug",getPost)
router.delete("/:id",deletePost)
export default router;