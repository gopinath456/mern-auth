import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { context } from '../Context/context';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

//created login page and sing up page using state hook 
const Login = () => {
  const [state,change]=useState('Sign up');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPass]=useState('');
  

  const navigate=useNavigate();

  const {backendUrl,setLoggedin,userData}=useContext(context);
   
  // Create the onSubmit handler
  const onSummitHandler=async (e)=>{

    e.preventDefault();
    try {
      axios.defaults.withCredentials=true;
      if(state==='Sign up'){
        const {data}=await axios.post(backendUrl+'/api/auth/register',{name,email,password});
        if(data.success){
          setLoggedin(true);
          toast.success(data.message);
          userData();
          navigate('/');
        }
        else
          toast.error(data.message);
      }
      else{
        const {data}=await axios.post(backendUrl+'/api/auth/login',{email,password});
        if(data.success){
          setLoggedin(true);
          toast.success(data.message);
          userData();
          navigate('/')
        } 
        else
          toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message)
    }
    
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={()=>navigate('/')}  src={assets.logo} alt="logo" className='absolute w-28 sm:w-32 left-5 sm:left-20 top-5 cursor-pointer'/>
      <div className='bg-slate-900 p-10 rounded-lg text-sm text-indigo-300'>
      <h2 className='text-white text-center font-semibold text-3xl mb-3'>{state==='Sign up'?'Create your acccount':'Login'}</h2>
      <p className='text-sm text-center mb-6 '>{state==='Sign up'?'Create Your account':'Login to your account'}</p>
      <form onSubmit={onSummitHandler}>
        {state==='Sign up'&&(
          <div className='flex rounded-full items-center px-5 py-2 gap-2 bg-[#333A5C] mb-4 w-full'>
          <img src={assets.person_icon} alt="persont icon" />
          <input type="text" placeholder='Full name' required className='outline-none bg-transparent' onChange={e=>setName(e.target.value)} value={name}/>
        </div> 
        )}
      
      <div className='flex bg-[#333A5C] gap-2 rounded-full px-5 py-2 mb-4'>
        <img src={assets.mail_icon} alt="mail icon" />
        <input type="email" placeholder='Email id' className='bg-transparent outline-none' required onChange={e=>setEmail(e.target.value)} value={email}/>
      </div>
      <div className='flex gap-2 bg-[#333A5C] rounded-full px-5 py-2 mb-4'>
        <img src={assets.lock_icon} alt="lock icon" />
        <input type="password" placeholder='password' required className='bg-transparent outline-none' onChange={e=>setPass(e.target.value)} value={password}/>
      </div>
      <p className='text-indigo-500 cursor-pointer mb-4' onClick={()=>navigate('/resetpass')}>forgot password?</p>
      <button className='bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full w-full text-white py-2.5 font-medium'>{state}</button>
      </form>
      {state==='Sign up'&&(
         <p className='mt-4 text-center text-gray-400'>You already have an accont?{' '}<span className='underline text-blue-500 cursor-pointer' 
         onClick={()=>{change('login')}}>Login here</span></p>
      )}
     
      {state!=='Sign up'&&(
        <p className='text-gray-400 text-center mt-4'>You don't have an accont?{' '}<span className='text-blue-500 underline cursor-pointer' 
        onClick={()=>{change('Sign up')}}>Sing up</span></p>
      )}

      </div>
     
    </div>
  )
}

export default Login