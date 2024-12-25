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
        res.json({sucesse:false,message:'Missing details'});
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
        res.json({success:false, message:error.message});
    }   
}

// Login Controller: Verifies user credentials and handles login.
export const login=async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password)
        res.json({success:false , message:'missing details'});
    
    try {
        const compare= await UserModel.findOne({email});
        if(!compare)
            res.json({success:false , message:"invalid user"});  
        const matching = await bcrypt.compare(password,compare.password);
        if(!matching)
            res.json({success:false , message:'invalid password'});
        const token=jwt.sign({id:compare._id},process.env.KEY,{expiresIn:'2h'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV=='production',
            siteOnly:process.env.NODE_ENV=='production'?'strict':"none",
            maxAge:2*60*60*1000
        })
    } catch (error) {
        res.json({success:false,message:error.message})
    }

    return res.json({success:true});
}

// Logout Controller: Clears user session and logs out the user.
export const logout=async (req,res)=>{
    res.clearCookie('token');
    res.json({success:true,message:'logged out'});
}


