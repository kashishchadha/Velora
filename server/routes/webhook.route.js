import express from 'express'
import { clerkwebhook } from '../controller/webhook.controller.js'
import bodyParser from 'body-parser'
const router=express.Router()
router.get("/clerk", (req, res) => res.status(200).json({ message: "Webhook endpoint ready" }))
router.post("/clerk", bodyParser.raw({ type: 'application/json' }), clerkwebhook)
export default router