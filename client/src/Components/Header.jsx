import React from 'react'
import { assets } from '../assets/assets'

// Main Body Component
// This component displays the main section for the home page.

const Header = () => {
  return (
    <div className='flex flex-col items-center mt-20 text-center text-gray-800 '>
        <img src={assets.header_img} alt="header" className='h-36 w-36 rounded-full'/>
        <h1 className='flex gap-2 font-medium text-xl sm:text-3xl mb-2 text-center'>
          Hey developer!
          <img src={assets.hand_wave} alt="hand-wave" className='w-8 aspect-square'/>
        </h1>
        <h2 className='font-semibold text-3xl sm:text-5xl mb-4'>Welcome to our app</h2>
        <p className='max-w-md mb-8'>let start with quick product tour and we will have you up and running in no time</p>
        <button className="border border-gray-500 hover:bg-gray-100 rounded-full border-solid px-6 py-2 transition-all">Get started</button>
    </div>
  )
}

export default Header