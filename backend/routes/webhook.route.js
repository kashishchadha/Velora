import express from "express"
import bodyParser from "body-parser"
import {clerkwebhook} from "../controller/webhook.controller.js"
const router=express.Router()
router.get("/clerk", bodyParser.raw({ type: 'application/json' }),clerkwebhook)
export default router