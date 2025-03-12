import React from 'react'
import { Routes, Route } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App