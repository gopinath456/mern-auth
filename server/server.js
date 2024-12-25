import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './mongoose.js';
import routes from './routes/routes.js';
const app=express();
const port=process.env.PORT||4000;
connectDB();
app.use(express.json());
app.use(cors({Credential:true}));
app.use(cookieParser());
app.use('/api/auth',routes);
app.get('/',(req,res)=>res.send('server is running'))
app.listen(port,()=>console.log('server is up'));



