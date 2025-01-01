import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div>
        <img src={assets.header_img} alt="header" className='h-36 w-36 rounded-full'/>
        <h1>Hey developer <img src={assets.hand_wave} alt="hand-wave" className='w-8 aspect-square'/></h1>
    </div>
  )
}

export default Header