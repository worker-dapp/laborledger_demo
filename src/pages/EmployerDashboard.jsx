import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const EmployerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6]">
        <Navbar />
        <div>
          <div className='text-3xl text-center p-12'>Welcome Name!</div>
          <div className='flex flex-wrap justify-center items-center gap-12 p-12'>
            <Link to='/new-job' className="w-1/5 h-44 flex justify-center items-center text-center p-8 rounded-lg shadow-md border-l-4 border-orange-500 cursor-pointer hover:shadow-lg transition duration-300 bg-white text-2xl font-medium text-gray-900">
                Create New Contract
            </Link>
            <Link to='/view-employees' className="w-1/5 h-44 flex justify-center items-center text-center p-8 rounded-lg shadow-md border-l-4 border-orange-500 cursor-pointer hover:shadow-lg transition duration-300 bg-white text-2xl font-medium text-gray-900">
                Review Applications
            </Link>
            <Link to='/view-employees' className="w-1/5 h-44 flex justify-center items-center text-center p-8 rounded-lg shadow-md border-l-4 border-orange-500 cursor-pointer hover:shadow-lg transition duration-300 bg-white text-2xl font-medium text-gray-900">
                View Open Contracts
            </Link>
            <Link to='/new-job' className="w-1/5 h-44 flex justify-center items-center text-center p-8 rounded-lg shadow-md border-l-4 border-orange-500 cursor-pointer hover:shadow-lg transition duration-300 bg-white text-2xl font-medium text-gray-900">
                Review Completed Contracts
            </Link>
            <Link to='/dispute' className="w-1/5 h-44 flex justify-center items-center text-center p-8 rounded-lg shadow-md border-l-4 border-orange-500 cursor-pointer hover:shadow-lg transition duration-300 bg-white text-2xl font-medium text-gray-900">
                View Ongoing Disputes
            </Link>
            <Link to='/payments' className="w-1/5 h-44 flex justify-center items-center text-center p-8 rounded-lg shadow-md border-l-4 border-orange-500 cursor-pointer hover:shadow-lg transition duration-300 bg-white text-2xl font-medium text-gray-900">
                View Closed Contracts
            </Link>
          </div>
        </div>
    </div>
  )
}

export default EmployerDashboard
