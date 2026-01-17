import express from "express"
import { getUserSavedPost,savePost } from "../controller/user.controller.js";
const router=express.Router();
router.get("/saved",getUserSavedPost)
router.patch("/save",savePost)
export default router;