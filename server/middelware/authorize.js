import jwt from 'jsonwebtoken'
import 'dotenv/config'
const authorize=(req,res,next)=>{
    const {token}=req.cookies;
    if(!token)
        return res.json({success:false,message:"Not authorized. Please log in to access this resource"});
    try {
        const payload=jwt.verify(token,process.env.KEY);
        if(!payload.id)
            return res.json({success:false,message:"Not authorized. Please log in to access this resource"});
        req.body.id=payload.id;
        next(); 
    } catch (error) {
       return res.json({success:false,message:error.message});
    }
   
}

export {authorize}