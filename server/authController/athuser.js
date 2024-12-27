import { UserModel } from "../models/userModel.js";
import 'dotenv/config'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { transporter } from "../configure/nodemailer.js";

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
            sameSite:process.env.NODE_ENV=='production'?'strict':'none',
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

// check if user is authenticated
export const is_auth=(req,res)=>{
  try {

    res.json({message:true});
    
  } catch (error) {
    res.json({succes:false,message:error.message})
  }
}

// Sending an reset OTP to the email address.
export const resetOtp = async (req,res) =>{
    const {email}=req.body;
    console.log(email)
    try {

        if(!email)
            return res.json({succes:false,message:"Email is required"})
        const user=await UserModel.findOne({email})
        if(!user)
            return res.json({succes:false,message:"Email is invalid. Please sign up or use a valid email to reset your password"});
        const otp=String(Math.floor(100000+Math.random()*900000));
        user.resetOtp=otp;
        user.resetOtpEspireAt=Date.now()+24*60*60*1000;
        await user.save();
        const resetOtp={
            from:'Gopinth R',
            to:email,
            subject:'The reset otp',
            text:`Your otp is ${otp},Please use this to reset your password`
        }
        transporter.sendMail(resetOtp);
        // const token=jwt.sign({id:user._id},process.env.KEY,{expiresIn:"4h"});
        // res.cookie('token',token,{
        //     httpOnly:true,
        //     secure:process.env.NODE_ENV==="production",
        //     sameSite:process.env.NODE_ENV=='production'?'strict':'none',
        //     maxAge:4*60*60*1000
        // });
        return res.json({succes:true,message:"The reset password otp sent successfully"});
    } catch (error) {
        return res.json({succes:false,message:error.message});
    }  
}

// reset password
export const resetPass= async (req,res)=>{

    const {email,otp,resetpassword}=req.body;
    if(!email,!otp,!resetpassword)
        return res.json({message:false,message:'Email,Opt and new password required'});

    try {
        const user=await UserModel.findOne({email});
        // console.log(user)
        if(!user)
           return  res.json({succes:false,message:'user not found'});

        if(user.resetOtp===""||user.resetOtp !==otp)
           return  res.json({succes:false,message:'Invalid otp'});

        if(user.resetOtpEspireAt<Date.now())
           return  res.json({succes:false,message:'Otp is expired '});
        const hash=await bcrypt.hash(resetpassword,10);
        user.password=hash;
        user.resetOtp='';
        user.resetOtpEspireAt=0;
        await user.save();
        return res.json({succes:true, message:"Password has been reset successfully"});
    } catch (error) {
        res.json({succes:false,message:error.message})
    }
  
}

//controller for showing user their details
export const isverified=async (req,res)=>{

    const {id}=req.body;
    if(!id)
        return res.json({succes:false,message:"not authorised, please login "});

    try {
        const user=await UserModel.findById(id);
       if(!user)
        return res.json({succes:false,message:"invalid user"})
        
       return res.json({
        succes:true,
        user:{
            name:user.name,
            isAccountVerified:user.isAccountVerified
        }
    })

    } catch (error) {
        return res.json({succes:false,message:error.message});
    }

   
}




