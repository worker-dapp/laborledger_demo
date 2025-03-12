import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full bg-[#FFD3B1]/20 font-medium'>
      <div className='flex items-center justify-between px-20 py-8'>
        <Link to='/' className='text-3xl'>LaborLedger</Link>
        <div className='flex gap-16 text-lg'>
            <Link to='/'>Home</Link>
            <Link to='/about-us'>About Us</Link>
            <Link>Get Started</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar