import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import WhyLaborLadger from '../components/WhyLaborLadger'

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6]">
      <Navbar />
      
      {/* Main Content */}
      <div className="flex flex-col items-center text-center px-6 py-20">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900">
          Welcome to <span className="text-[#E08A44]">LaborLedger</span>
        </h1>
        <h3 className="text-lg text-gray-700 mt-3">
          Choose your role to create an account or sign in.
        </h3>

        {/* Cards Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          
          {/* Employer Card */}
          <div className="p-10 rounded-3xl shadow-2xl border border-gray-100 bg-white/80 backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
              I’m an Employer
            </h3>
            <p className="text-gray-700 mt-2 text-sm md:text-base">
              Find and hire the best workers with ease.
            </p>
            <Link to='/employerRegister' className="w-full">
              <button className="mt-6 bg-gradient-to-r from-[#FFB07F] via-[#FFA062] to-[#E08A44] text-white font-medium px-6 py-3 rounded-lg w-full transition-all hover:shadow-lg hover:brightness-110">
                Create a Contract →
              </button>
            </Link>
          </div>

          {/* Employee Card */}
          <div className="p-10 rounded-3xl shadow-2xl border border-gray-100 bg-white/80 backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
              I’m an Employee
            </h3>
            <p className="text-gray-700 mt-2 text-sm md:text-base">
              Find opportunities that suit your needs.
            </p>
            <Link to='/employeeRegister' className="w-full">
              <button className="mt-6 bg-gradient-to-r from-[#FFB07F] via-[#FFA062] to-[#E08A44] text-white font-medium px-6 py-3 rounded-lg w-full transition-all hover:shadow-lg hover:brightness-110">
                Find a Job →
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
