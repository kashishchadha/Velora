import User from "../models/user.model.js"

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
        res.status(400).json({
            message:"webhook verification failed!"
        });
    }


    
if (evt.type === 'user.created') {
    const newuser= new User({
        clerkUserId:evt.data.id  
    })
}
}