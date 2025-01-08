import React, { useContext, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { context } from '../Context/context'
import { toast } from 'react-toastify'
const EmailVerification = () => {
  const navigate=useNavigate()
  const ref=useRef([]);
  const {backendUrl,userData,userdata}=useContext(context);
  
  // Move to the next input field
  function authofocus(e,index){
     if(e.target.value.length>0 && index<ref.current.length-1)
      ref.current[index+1].focus();
  }
  
  // Move to the previous input field when they pressed backspace
  function handelonkey(e,index){
    if(e.key==='Backspace'&& e.target.value===''&& index>0)
      ref.current[index-1].focus();
  }

  // past the otp to the input field
  function paste(e){
   const stringpast=e.clipboardData.getData('text');
   const arraypast=stringpast.split('');
   arraypast.forEach((char,index)=>{
    if(ref.current[index])
      ref.current[index].value=char
  })
  }
  
  // This code handles OTP input verification
  async function summit(e){
   try {
    axios.defaults.withCredentials=true;
    e.preventDefault();
    const otparray=ref.current.map(e=>e.value)
    const otp=otparray.join('')
    const {data}=await axios.post(backendUrl+'/api/auth/verify-email',{otp});
    if(data.success){
      toast.success(data.message);
      userData();
      navigate('/')
    }
    else
     toast.error(data.message);
   } catch (error) {
     toast.error(error.message);
   }
  }

  useEffect(()=>{
      if(userdata.isAccountVerified)
        toast.error('You are already verified!');
        navigate('/')}
  ,[userdata.isAccountVerified])
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img src={assets.logo} alt="logo" onClick={()=>{navigate('/')}} className='absolute w-28 sm:w-32 left-5 sm:left-20 top-5 cursor-pointer'/>
      <div className='flex flex-col items-center bg-slate-900 text-indigo-300 p-8 rounded-lg text-sm'>
       <h2 className='text-white font-semibold text-2xl mb-4 text-center'>Email verify OTP</h2>
       <p className='text-center mb-6'>Enter the 6-degits code sent to your email id.</p>
       <form className='w-full' onSubmit={summit}>
       <div className='flex justify-between mb-8 ' onPaste={paste}>
        {
          Array(6).fill(0).map((_,index)=>(
            <input type="text" maxLength="1" key={index} className='w-12 h-12 bg-[#333A5C] text-xl text-center text-white rounded-md' ref={(e)=>{
             ref.current[index]=e}} onInput={e=>{authofocus(e,index)}} onKeyDown={e=>{handelonkey(e,index)}}/>
          ))
        }
       </div>
       <button className='bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full w-full py-3'>verify email</button>
       </form>
      </div>
    </div>
  )
}

export default EmailVerification