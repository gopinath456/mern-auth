import express from 'express'
import {register,login,logout} from '../authController/athuser.js'
const routes=express.Router();

routes.post('/register',register);
routes.post('/login',login);
routes.delete('/logout',logout);

export default routes;