import User from "../models/user.model.js"
import {Webhook} from "svix"
export const clerkwebhook= async (req,res)=>{
    console.log("🔔 Webhook received!")
    const WEBHOOK_SECRET=process.env.CLERK_WEBHOOK_SECRET;
    if(!WEBHOOK_SECRET){
        console.log(" No CLERK_WEBHOOK_SECRET found")
        throw new Error("webhook secret needed")
    }
    
    const payload = req.body.toString();
    const headers = {
        'svix-id': req.headers['svix-id'],
        'svix-timestamp': req.headers['svix-timestamp'],
        'svix-signature': req.headers['svix-signature']
    };

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(payload, headers);
        console.log("✅ Webhook verified")
        console.log("📋 Event Type:", evt.type)
        console.log("📦 Full User Data:", JSON.stringify(evt.data, null, 2))
    } catch (err) {
        console.log("❌ Verification failed:", err.message)
        return res.status(400).json({
            message:"webhook verification failed!"
        });
    }

if (evt.type === 'user.created') {
   
    const newUser= new User({
        clerkId:evt.data.id  ,
        username:evt.data.username || evt.data.email_addresses[0].email_address,
        email:evt.data.email_addresses[0].email_address,
        img:evt.data.image_url,
    });
    try {
  await newUser.save();
  console.log("✅ User saved:", newUser.username)
} catch (err) {
  console.log("❌ Save failed:", err.message)
  return res.status(500).json({ message: "Failed to save user", error: err.message });
}


}

return res.status(200).json({
    message:"webhook received",
});
}
