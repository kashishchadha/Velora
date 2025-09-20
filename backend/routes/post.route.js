import express from "express"
import {getPost,getPosts,createPost,deletePost} from "../controller/post.controller.js"
const router=express.Router()
router.get("/", getPost)
router.get("/:slug",getPosts)
router.post("/",createPost)
router.delete("/:id",deletePost)
export default router