import express from "express"
const router=express.Router()
router.get("/apptest",(req,res)=>{
    res.status(200).send("working");
})
export default router