import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // Replace with authentication logic
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

          {/* Conditionally Render Sign In or Profile */}
          {user ? (
            <Link 
              to={user.role === 'employee' ? '/employee-profile' : '/employer-profile'} 
              className='bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all shadow-md text-lg'>
              Profile
            </Link>
          ) : (
            <div className='relative' ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!isDropdownOpen)} 
                className='bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all shadow-md text-lg'>
                Sign In
              </button>

              {isDropdownOpen && (
                <div className='absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg'>
                  <Link 
                    to='/employeeDashboard' 
                    className='block px-4 py-2 text-gray-900 hover:bg-orange-100 transition-all rounded-t-lg'>
                    Employee
                  </Link>
                  <Link 
                    to='/employerDashboard' 
                    className='block px-4 py-2 text-gray-900 hover:bg-orange-100 transition-all rounded-b-lg'>
                    Employer
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
