import { UserModel } from "../models/userModel.js";
import 'dotenv/config'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { transporter } from "../configure/nodemailer.js";
import { text } from "express";

// Add user data to the database after validating the input
export const register=async (req,res)=>{
    const {name,email,password}=req.body;
    if(!name||!email||!password)
        return res.json({sucesse:false,message:'Missing details'});
    try {
        const existingUser= await UserModel.findOne({email});
        if(existingUser)
            res.json({success:false, message:"user already existed"})
        const hashpassword= await bcrypt.hash(password,10);
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
            maxAge:2*60*60*1000
        })

        // Function to send a welcome email to new users using Nodemailer

        const welcome={
            from:'gopinath',
            to:email,
            subject:'Welcome',
            text:`welcome user your email id:${email}`
        }
        await transporter.sendMail(welcome)
        return res.json({success:true});
    } catch (error) {
        return res.json({success:false, message:error.message});
    }   
}

// Login Controller: Verifies user credentials and handles login.
export const login=async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password)
        return res.json({success:false , message:'missing details'});
    
    try {
        const compare= await UserModel.findOne({email});
        if(!compare)
            return res.json({success:false , message:"invalid user"});  
        const matching = await bcrypt.compare(password,compare.password);
        if(!matching)
            return res.json({success:false , message:'invalid password'});
        const token=jwt.sign({id:compare._id},process.env.KEY,{expiresIn:'2h'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV=='production',
            siteOnly:process.env.NODE_ENV=='production'?'strict':"none",
            maxAge:2*60*60*1000
        })
        return res.json({success:true});
    } catch (error) {
        return res.json({success:false,message:error.message})
    }   
}

// Logout Controller: Clears user session and logs out the user.
export const logout=async (req,res)=>{
    res.clearCookie('token');
    res.json({success:true,message:'logged out'});
}

// Sending an OTP to the email address.
export const verifyOtpSent=async (req,res)=>{
    try {
        const {email,id}=req.body;
        console.log(email);
         // creting middelware for authorizeUser
        // const {token}=req.cookies;
        // const {id}=jwt.verify(token,process.env.KEY);
        const user= await UserModel.findOne({_id:id});
        if(user.isAccountVerified)
        return res.json({success:false,message:'Account already verified'});
        const otp=String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp=otp;
        user.verifyOtpEpireAt=Date.now()+24*60*60*1000;
        await user.save();
        const verify={
            from:'gopinath',
            to:email,
            subject:'Account Verifycation OTP',
            text:`Your OTP is ${otp}, Please Verify Your account with this otp`
        }
        await transporter.sendMail(verify);
        return res.json({succes:true, message:"the otp sent successfully"})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

//Checking if the entered email OTP matches the expected value
export const verifyOtp= async (req,res)=>{
try{
 // creting middelware for authorizeUser
//  const {token}=req.cookies;
//  const {id}=jwt.verify(token,process.env.KEY);
   const {otp,id}=req.body;
   if(!otp)
   return res.json({succes:false, message:"missing details"});
   const user =await UserModel.findById(id);
   if(user.verifyOtp==''||user.verifyOtp !==otp)
    return res.json({succes:false,message:'the opt is invalid'})
   if(user.verifyOtpEpireAt<Date.now())
   res.json({succes:false,message:'opt is expired'});
   user.isAccountVerified=true;
   user.verifyOtp='';
   user.verifyOtpEpireAt=0;
   await user.save();
   return res.json({succes:true, message:'Email verified succesfylly'});
}
catch(error){
    return res.json({succes:false,message:error.message});
}
}

