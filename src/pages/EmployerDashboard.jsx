import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const EmployerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6]">
        <Navbar />
        <div>
          <div className='text-3xl text-center p-12'>Welcome Name!</div>
          <div className='flex flex-wrap justify-center gap-12 p-12'>
          <Link to='/job-portal' className="w-1/4 text-center p-10 rounded-2xl shadow-2xl font-medium text-2xl border border-gray-100 bg-white/80 backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] text-gray-900">
                Create a New Job
            </Link>
          <Link to='/new-job' className="w-1/4 text-center p-10 rounded-2xl shadow-2xl font-medium text-2xl border border-gray-100 bg-white/80 backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] text-gray-900">
                Create New Contract
            </Link>
            <Link to='/view-employees' className="w-1/4 text-center p-10 rounded-2xl shadow-2xl font-medium text-2xl border border-gray-100 bg-white/80 backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] text-gray-900">
                Review Applications
            </Link>
            <Link to='/view-employees' className="w-1/4 text-center p-10 rounded-2xl shadow-2xl font-medium text-2xl border border-gray-100 bg-white/80 backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] text-gray-900">
                View Open Contracts
            </Link>
            <Link to='/new-job' className="w-1/4 text-center p-10 rounded-2xl shadow-2xl font-medium text-2xl border border-gray-100 bg-white/80 backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] text-gray-900">
                Review Completed Contracts
            </Link>
            <Link to='/dispute' className="w-1/4 text-center p-10 rounded-2xl shadow-2xl font-medium text-2xl border border-gray-100 bg-white/80 backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] text-gray-900">
                View Ongoing Disputes
            </Link>
            <Link to='/payments' className="w-1/4 text-center p-10 rounded-2xl shadow-2xl font-medium text-2xl border border-gray-100 bg-white/80 backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] text-gray-900">
                View Closed Contracts
            </Link>
          </div>
        </div>
    </div>
  )
}

export default EmployerDashboard