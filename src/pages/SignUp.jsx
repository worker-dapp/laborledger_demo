import React, { useState } from "react";
import img from '../assets/image.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [role, setRole] = useState("employee");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setError("");
        
    //     console.log("Logging in as", role, email);
    //   };

  return (
    <div className="flex">
      <div className="w-1/2 h-screen flex flex-col justify-center items-center">
            <img src={img} alt="LaborLedger" className="w-2/5" />
            <h1 className="text-5xl pt-6">LaborLedger</h1>
      </div>

      <div className="w-1/2 flex justify-center items-center p-6 text-lg">
        <div className="p-6 w-3/4">
          <h2 className="text-3xl font-semibold mb-8 text-[#EDAA76]">Register Here</h2>
          <select 
           value={role} 
           onChange={(e) => setRole(e.target.value)} 
           className="w-full p-3.5 mb-4 border border-gray-300 rounded-xl"
         >
           <option>Select the Role</option>
           <option value="employee">Employee</option>
           <option value="employer">Employer</option>
         </select>
          <form>
            <div className="flex gap-5">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full p-3 mb-4 border border-gray-300 rounded-xl"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full p-3 mb-4 border border-gray-300 rounded-xl"
                />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-xl"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-xl pr-10"
              />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-xl pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-4 right-5 text-gray-500 text-xl"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <button 
              type="submit" 
              className="w-full font-medium p-3 bg-gradient-to-r from-[#FFD3B1] via-[#F3A76D] to-[#EDAA76] rounded-xl cursor-pointer"
            >
              Register
            </button>
          </form>
          <Link to='/'>
                <h1 className="text-gray-500 text-md pt-4 text-center">Already have an account? <span className="text-[#EDAA76] underline cursor-pointer">Sign In</span></h1>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp