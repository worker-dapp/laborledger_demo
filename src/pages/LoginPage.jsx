import React, { useState } from "react";
import img from '../assets/image.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [role, setRole] = useState("employee");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            <h1 className="text-5xl pt-6 ">LaborLedger</h1>
      </div>

      <div className="w-1/2 flex justify-center items-center p-6 text-lg">
        <div className="p-6 w-3/4">
          <h2 className="text-3xl font-semibold mb-8 text-[#EDAA76]">Login</h2>
          <select 
           value={role} 
           onChange={(e) => setRole(e.target.value)} 
           className="w-full p-3.5 mb-4 border border-gray-300 rounded-xl"
         >
           <option value="employee">Employee</option>
           <option value="employer">Employer</option>
         </select>
          <form>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-xl"
            />
            
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Login
            </button>
          </form>
            <Link to='/signUp'>
              <h1 className="text-gray-500 text-md pt-4 text-center">Already have an account? <span className="text-[#EDAA76] underline cursor-pointer">Sign In</span></h1>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage