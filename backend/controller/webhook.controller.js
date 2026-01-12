import User from "../models/user.model.js"
import {Webhook} from "svix"
export const clerkwebhook= async (req,res)=>{
    const WEBHOOK_SECRET=process.env.CLERK_WEBHOOK_SECRET;
    if(!WEBHOOK_SECRET){
        throw new Error("webhook secret needed")
    }
    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(payload, headers);
    } catch (err) {
        return res.status(400).json({
            message:"webhook verification failed!"
        });
    }
console.log(evt.data)

if (evt.type === 'user.created') {
    const newUser= new User({
        clerkUserId:evt.data.id  ,
        username:evt.data.username || evt.data.email_addresses[0].email_address,
        email:evt.data.email_addresses[0].email_address,
        img:evt.data.profile_img_url,
    });
    try {
  await newUser.save();
} catch (err) {
  return res.status(500).json({ message: "Failed to save user", error: err.message });
}


}

return res.status(200).json({
    message:"webhook received",
});
}