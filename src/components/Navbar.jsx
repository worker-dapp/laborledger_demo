import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full bg-[#FFD3B1]/20 font-medium shadow-md'>
      <div className='flex items-center justify-between px-20 py-5'>
        
        {/* Enhanced Brand Name */}
        <Link to='/' className='text-4xl font-extrabold tracking-wide'>
          <span className='text-gray-900 hover:text-orange-600 transition-all'>Labor</span>
          <span className='text-orange-500'>Ledger</span>
        </Link>

        {/* Navigation */}
        <div className='flex items-center gap-12 text-lg'>
          <NavLink to='/' className={({ isActive }) => 
            `hover:text-orange-600 transition-all ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-900'}`}>
            Home
          </NavLink>
          <NavLink to='/about-us' className={({ isActive }) => 
            `hover:text-orange-600 transition-all ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-900'}`}>
            About Us
          </NavLink>

          {/* CTA Button - Fixed Alignment */}
          <Link 
            to='/get-started' 
            className='bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all shadow-md text-lg flex items-center justify-center'>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
