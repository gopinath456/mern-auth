import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const connectDB=async ()=> {
    try{
        console.log(`${process.env.DATA_BASE}mern-auth`)
        await mongoose.connect(`${process.env.DATA_BASE}mern-auth`);
        console.log('connected successfully');
        }
    catch(error){
           console.log('the connection unsuccesfull');
        }
}
export default connectDB;