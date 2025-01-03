import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'

// NavigationBar Component
// This component renders the navigation bar for the home page.

const Navbar = () => {
  const loginpage=useNavigate();
  return (
    <div className='w-full flex  justify-between p-4 sm:p-6 sm:px-24 absolute items-center top-0'>
       <img src={assets.logo} alt="logo" className='w-28 sm:w-32'/>
       <button className='flex gap-2 items-center border border-gray-500 rounded-full px-6 py-2 hover:bg-gray-100' onClick={()=>loginpage('/login')}>login <img src={assets.arrow_icon} alt="arrow" /></button>
    </div>
  )
}

export default Navbar