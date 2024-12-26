import express from 'express'
import {register,login,logout,verifyOtpSent,verifyOtp} from '../authController/athuser.js'
const routes=express.Router();

// Created routes using the Router object for handling different HTTP requests

routes.post('/register',register);
routes.post('/login',login);
routes.delete('/logout',logout);
routes.post('/otp',verifyOtpSent);
routes.post('/verify',verifyOtp);

export default routes;