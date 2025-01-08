import React, { useContext, useReducer } from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import { context } from '../Context/context'
import axios from 'axios'
import { toast } from 'react-toastify'
// NavigationBar Component
// This component renders the navigation bar for the home page.

const Navbar = () => {
  const loginpage=useNavigate();
  const navigate=useNavigate();
  const {userdata,setusedata,setLoggedin,isLoggedin,backendUrl,logout}=useContext(context)
  
  // sending the verification opt
  const verifyOtpSent=async ()=>{
    axios.defaults.withCredentials=true;
    try {
      const {data}=await axios.post(backendUrl+'/api/auth/otp-sent');
      if(data.success){
        toast.success(data.message);
        navigate('/emailverification'); 
      }
       
      else
        toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className='w-full flex  justify-between p-4 sm:p-6 sm:px-24 absolute items-center top-0'>
       <img src={assets.logo} alt="logo" className='w-28 sm:w-32'/>
       {userdata?
       <div className='rounded-full flex justify-center h-8 w-8 bg-black text-white items-center group relative '>{userdata.name[0].toUpperCase()}
       <div className='absolute z-10 rounded-md text-black hidden group-hover:block pt-10 top-0 right-0'>
       <ul className='text-xl bg-gray-100 m-0 w-40'>
        {userdata.isAccountVerified===false&&<li className='hover:bg-gray-200 cursor-pointer px-2 py-1' onClick={()=>{verifyOtpSent()}}>Verify email</li> }
        <li className='hover:bg-gray-200 cursor-pointer px-2 py-1' onClick={()=>{logout()}}>logout</li>
       </ul>
       </div>
       </div>:
       <button className='flex gap-2 items-center border border-gray-500 rounded-full px-6 py-2 hover:bg-gray-100' onClick={()=>loginpage('/login')}>login <img src={assets.arrow_icon} alt="arrow" /></button>}
       
    </div>
  )
}

export default Navbar