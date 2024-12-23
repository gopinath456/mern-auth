import mongoose from "mongoose";
import 'dotenv/config'
const connectDB=async ()=> {
    try{
        await mongoose.connect(`${process.env.DATA_BASE}mern-auth`);
        console.log('connected successfully');
        }
    catch(error){
           console.log(error);
        }
}
export default connectDB;