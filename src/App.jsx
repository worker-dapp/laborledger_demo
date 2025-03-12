import React from 'react'
import { Routes, Route } from "react-router-dom"
import LandingPage from './pages/LandingPage'
import EmployeeRegister from './pages/EmployeeRegister'
import EmployerRegister from './pages/EmployerRegister'
import EmployeeLogIn from './pages/EmployeeLogIn'
import EmployerLogIn from './pages/EmployerLogIn'
import AboutUs from './pages/AboutUs'

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
      </Routes>
    </div>
  )
}

export default App