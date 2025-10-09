import express from "express"
import {getPost,getPosts,createPost,deletePost,uploadAuth} from "../controller/post.controller.js"
const router=express.Router()
router.get("/upload-auth",uploadAuth)
router.get("/", getPosts)
router.get("/:slug",getPost)
router.post("/",createPost)
router.delete("/:id",deletePost)
export default router