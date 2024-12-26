import express from 'express'
import {register,login,logout,verifyOtpSent,verifyOtp} from '../authController/athuser.js'
import { authorize } from '../middelware/authorize.js';
const routes=express.Router();

// Created routes using the Router object for handling different HTTP requests

routes.post('/register',register);
routes.post('/login',login);
routes.delete('/logout',logout);
routes.post('/otp',authorize,verifyOtpSent);
routes.post('/verify',authorize,verifyOtp);

export default routes;