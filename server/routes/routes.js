import express from 'express'
import {register,login,logout,verifyOtpSent,verifyOtp, is_auth, resetOtp, resetPass, userveri,isverified} from '../authController/athuser.js'
import { authorize } from '../middelware/authorize.js';
const routes=express.Router();

// Created routes using the Router object for handling different HTTP requests

routes.post('/register',register);
routes.post('/login',login);
routes.delete('/logout',logout);
routes.post('/otp-sent',authorize,verifyOtpSent);
routes.post('/verify-email',authorize,verifyOtp);
routes.get('/is-auth',authorize,is_auth);
routes.post('/reset-otp',resetOtp);
routes.post('/reset-pass',resetPass);
routes.get('/user-verified',authorize,isverified);
export default routes;