import { UserModel } from "../models/userModel.js";
import 'dotenv/config'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

// Add user data to the database after validating the input
export const register=async (req,res)=>{
    const {name,email,password}=req.body;
    if(!name,!email,!password)
        res.json({sucesse:false,message:'Missing details'});
    try {
        const existingUser= await UserModel.find({email});
        if(existingUser)
            res.json({success:false, message:"user already existed"})
        const hashpassword=bcrypt.hash(password,10);
        const s1=new UserModel({
            name:name,
            email:email,
            password:hashpassword
        });
        await s1.save();
        const token=jwt.sign({id:s1._id},process.env.KEY,{expiresIn:'2h'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV=='production',
            siteOnly:process.env.NODE_ENV=='production'?'strict':'none',
            maxTime:2*60*60*1000
        })
    } catch (error) {
        res.json({success:false, message:error.message});
    }   
}
