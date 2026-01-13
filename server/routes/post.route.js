import express from "express"
import { getPosts,getPost ,create,deletePost,uploadAuth} from "../controller/post.controller.js";
const router=express.Router();
router.get("/",getPosts)
router.get('/upload-auth',uploadAuth)
router.get("/:slug",getPost)
router.post("/",create);
router.delete("/:id",deletePost)
export default router;