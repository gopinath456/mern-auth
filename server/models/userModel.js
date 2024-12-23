import mongoose from "mongoose";

const schema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    verifyOtp:{type:String,default:''},
    verifyOtpEpireAt:{type:Number,default:0},
    isAccountVerified:{type:Boolean,default:false},
    resetOtp:{type:String,default:''},
    resetOtpEspireAt:{type:Number,default:0}
})

export const UserModel= mongoose.models.User||mongoose.model('User',schema);

