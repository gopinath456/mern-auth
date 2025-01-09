import React, { Component, useContext, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { context } from '../Context/context';
import {toast} from 'react-toastify'

// reset password Component
const ResetPass = () => {
  const navigate=useNavigate();
  const ref=useRef([]);
  const [email,setemail]=useState();
  const [otp,setopt]=useState();
  const [resetpassword,setNewPassword]=useState();
  const [emailpage,setemailpage]=useState(true);
  const [resetOptPage,setResetOptpPage]=useState(false);
  const [resetPassPage,setResetPassPage]=useState(false);
  

  const {backendUrl}=useContext(context); 
  
  // sending reset opt 

  const resetOtp=async (e)=>{
   try {
       e.preventDefault();
       const {data}=await axios.post(backendUrl+'/api/auth/reset-otp',{email});
       if(data.success){
        toast.success(data.message);
        setemailpage(false);
        setResetOptpPage(true);
       }
       else
        toast.error(data.message);
   } catch (error) {
     toast.error(error.message)
   }
  }

  //creating a function to go to reset password page

  const goToResetPassword=(e)=>{
   e.preventDefault();
   try {
    console.log(ref.current);
    const otparray=ref.current.map((e)=>(e.value));
    console.log(otparray);
    const otp=otparray.join('');
    console.log(otp);
    setopt(otp);
    setResetOptpPage(false);
    setResetPassPage(true);
   } catch (error) {
     toast.error(error.message)
   }
   
  }

  //I created a function to verify OTP and reset password

  const resetpass= async (e)=>{
   try {
     e.preventDefault();
     const {data}=await axios.post(backendUrl+'/api/auth/reset-pass',{email,otp,resetpassword});
     if(data.success){
      toast.success(data.message);
      navigate('/login');
     }
     else
     toast.error(data.message);
   } catch (error) {
     toast.error(error.message)
   }
  }
 
  // function for auto foucus to next input

  const autofocus=(e,index)=>{
    if(e.target.value.length>0 && index<ref.current.length-1)
     ref.current[index+1].focus();
  }
  
  //Function to navigate to the previous input field when the backspace key is pressed.

  const backSpace=(e,index)=>{
    if(e.key=='Backspace'&&e.target.value===''&&index>0)
    ref.current[index-1].focus();

  }

  //function to paste the opt in input field
  const paste=(e)=>{
    const pasteSting=e.clipboardData.getData('text');
    const pasteArray=pasteSting.split('');
    pasteArray.forEach((char,index)=>{
      if(ref.current[index])
        ref.current[index].value=char;
    })
    
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img src={assets.logo} alt="logo" onClick={()=>navigate('/')} className='absolute w-28 sm:w-32 left-5 sm:left-20 top-5 cursor-pointer' />
      
      {emailpage&&
       (<div className='bg-slate-900 text-indigo-300 rounded-lg p-10 flex flex-col text-center w-98 text-sm ' >
       <form className='min-w-full' onSubmit={resetOtp}>
       <h1 className='text-white text-2xl font-semibold mb-4'>Reset Password</h1>
       <p className='text-center mb-4'>Enter you registered email addresss</p>
       <div className='rounded-full bg-[#333A5C] flex px-5 py-2.5 gap-2 mb-4 items-center'>
        <img src={assets.mail_icon} alt="email icon" className='w-3 h-3 '/>
        <input type="email" className='bg-transparent outline-none' placeholder='Email' onChange={(e)=>{setemail(e.target.value)}} required/>
       </div>
       <button className='rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 py-2 text-white w-full'>Summit</button>
       </form>
       </div>)
      }
      
      {resetOptPage&&
       (<div className='bg-slate-900 text-indigo-300 rounded-lg p-10 flex flex-col text-center w-98 text-sm ' onPaste={paste}>
       <form className='min-w-full' onSubmit={goToResetPassword}>
       <h1 className='text-white text-2xl font-semibold mb-4'>Reset Password OTP</h1>
       <p className='text-center mb-4'>Enter the 6-digits code sent to your email id </p>
       <div className='flex gap-1 mb-4'>
        {Array(6).fill(0).map((_,index)=>
          (<input type="text" maxLength={1} key={index} className='h-14 w-14 rounded-lg bg-slate-500 text-3xl text-white text-center' ref={(e)=>ref.current[index]=e} onInput={(e)=>{autofocus(e,index)}} onKeyDown={(e)=>backSpace(e,index)}/>)
        )}
       </div>
       <button className='rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 py-2 text-white w-full'>Summit</button>
       </form>
      </div>)
      }
      {resetPassPage &&
      (<div className='bg-slate-900 text-indigo-400 rounded-lg p-10 text-center text-sm w-98'>
       <form className='min-w-full flex flex-col justify-center items-center' onSubmit={resetpass}>
       <h1 className='text-2xl text-white font-semibold mb-4'>New password</h1>
       <p className='mb-4'>Enter the new password below</p>
       <div className='rounded-full bg-[#333A5C] text-whites flex gap-2 px-4 py-2.5 items-center mb-4'>
         <img src={assets.lock_icon} alt="password icon" />
         <input type="password" className='bg-transparent outline-none text-white' placeholder='Password' onChange={(e)=>setNewPassword(e.target.value)}/>
       </div>
       <button className='bg-gradient-to-r from-indigo-500 to-indigo-900 w-full rounded-full text-white py-2'>Summit</button>
       </form>
      </div>)
      }
     
      
      

    </div>
  )
}

export default ResetPass