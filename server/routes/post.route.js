import express from "express"
import { getPosts,getPost ,create,deletePost} from "../controller/post.controller.js";
const router=express.Router();
router.get("/",getPosts)
router.get("/:slug",getPost)
router.post("/",create);
router.delete("/:id",deletePost)
export default router;