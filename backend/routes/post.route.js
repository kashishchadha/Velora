import express from "express"
const router=express.Router()
router.get("/posttest",(req,res)=>{
    res.status(200).send("working post");
})
export default router