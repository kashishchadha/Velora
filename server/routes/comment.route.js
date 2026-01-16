import express from "express"
import { addComment,getPostComments,deleteComment } from "../controller/comments.controller.js";
const router=express.Router();
router.get("/:postId",getPostComments)
router.post("/:postId",addComment)
router.delete("/:id",deleteComment)
export default router;