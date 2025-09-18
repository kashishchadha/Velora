import express from "express"
const router=express.Router()
router.get("/comtest",(req,res)=>{
    res.status(200).send("working com");
})
export default router