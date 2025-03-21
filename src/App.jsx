import React from 'react'
import { Routes, Route } from "react-router-dom"
import LandingPage from './pages/LandingPage'
import EmployeeRegister from './pages/EmployeeRegister'
import EmployerRegister from './pages/EmployerRegister'
import EmployeeLogIn from './pages/EmployeeLogIn'
import EmployerLogIn from './pages/EmployerLogIn'
import AboutUs from './pages/AboutUs'
import EmployeeDashboard from './pages/EmployeeDashboard'
import EmployerDashboard from './pages/EmployerDashboard'
import ViewEmployees from './pages/ViewEmployees'
import Dispute from './pages/Dispute'
import Payments from './pages/Payments'
import NewJob from './pages/NewJob'
import JobDetails from './pages/JobDetails'
import MyJobs from './pages/MyJobs'
import MyJobDetails from './pages/MyJobDetails'
import EmployerProfile from './pages/EmployerProfile'
import EmployeeProfile from './pages/EmployeeProfile'
import EmployerJobPortal from './pages/EmployerJobPortal'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/employeeRegister' element={<EmployeeRegister />} />
        <Route path='/employerRegister' element={<EmployerRegister />} />
        <Route path='/employeeLogin' element={<EmployeeLogIn />} />
        <Route path='/employerLogin' element={<EmployerLogIn />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/employerDashboard' element={<EmployerDashboard />} />
        <Route path='/employeeDashboard' element={<EmployeeDashboard />} />
        {/* <Route path='/view-employees' element={<ViewEmployees />} /> */}
        <Route path='/dispute' element={<Dispute />} />
        <Route path='/payments' element={<Payments />} />
        <Route path='/new-job' element={<NewJob />} />
        <Route path='/job-details/:jobId' element={<JobDetails />} />
        <Route path='/my-jobs' element={<MyJobs />} />
        <Route path="/my-jobs/:jobId" element={<MyJobDetails />} />
        <Route path="/employer-profile" element={<EmployerProfile />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="/view-employees" element={<EmployerJobPortal />} />
      </Routes>
    </div>
  )
}

export default App