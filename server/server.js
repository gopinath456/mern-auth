import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import connectDB from './mongoose.js';
const app=express();
const port=process.env.PORT||4000;
connectDB();
app.use(express.json());
app.use(cors({Credential:true}));
app.use(cookieParser());
app.listen(port,()=>console.log('server is up'));



