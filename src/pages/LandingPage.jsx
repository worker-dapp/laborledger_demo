import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import WhyLaborLadger from '../components/WhyLaborLadger'

const LandingPage = () => {
  return (
    <div className=''>
      <Navbar />
      <div className='flex flex-col p-36 gap-20'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-6xl font-semibold'>Join The LaborLedger</h1>
          <h3 className='text-lg'>Please select an option below.</h3>
        </div>

        <div className="flex gap-10">
          <div className="shadow-lg p-8 rounded-2xl border border-gray-200 w-full">
            <h3 className="text-4xl">
              I'm a Employer
            </h3>
            <Link to='/employerRegister'>
              <button className="mt-20 bg-gradient-to-r from-[#FFD3B1] via-[#FED0AC] to-[#EDAA76] cursor-pointer px-4 py-3 rounded-lg w-full">
                Register →
              </button>
            </Link>
          </div>

          <div className="shadow-lg p-8 rounded-2xl border border-gray-200 w-full">
            <h3 className="text-4xl">
              I'm a Employee
            </h3>
            <Link to='/employeeRegister'>
              <button className="mt-20 bg-gradient-to-r from-[#FFD3B1] via-[#FED0AC] to-[#EDAA76] cursor-pointer px-4 py-3 rounded-lg w-full">
                Register →
              </button>
            </Link>
          </div>
        </div>
      </div>
      <WhyLaborLadger />
      <Footer />
    </div>
  )
}

export default LandingPage