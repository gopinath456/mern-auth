import express from 'express'
import {register,login,logout,verifyOtpSent,verifyOtp, is_auth, resetOtp, resetPass} from '../authController/athuser.js'
import { authorize } from '../middelware/authorize.js';
const routes=express.Router();

// Created routes using the Router object for handling different HTTP requests

routes.post('/register',register);
routes.post('/login',login);
routes.delete('/logout',logout);
routes.post('/otp',authorize,verifyOtpSent);
routes.post('/verify',authorize,verifyOtp);
routes.post('/is-auth',authorize,is_auth);
routes.post('/reset-otp',resetOtp);
routes.post('/reset-pass',resetPass);

export default routes;