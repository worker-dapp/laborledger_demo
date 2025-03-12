import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const EmployerLogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setError("");
        
    //     console.log("Logging in as", role, email);
    //   };

  return (
    <div className="">
      <Navbar />
      <div className="flex justify-center items-center p-6 text-xl">
        <div className="pt-10 w-2/5">
          <h2 className="text-4xl font-semibold pb-10 text-[#EDAA76]">Employer LogIn</h2>
          <form>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 mb-6 border border-gray-300 rounded-xl"
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 mb-6 border border-gray-300 rounded-xl pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-5 right-5 text-gray-500 text-xl"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <button 
              type="submit" 
              className="w-full font-medium p-4 bg-gradient-to-r from-[#FFD3B1] via-[#F3A76D] to-[#EDAA76] rounded-xl cursor-pointer"
            >
              Log in
            </button>
          </form>
          <Link to='/employerRegister'>
                <h1 className="text-gray-500 text-md pt-4 text-center">Don't have an account? <span className="text-[#EDAA76] underline cursor-pointer">Register Here</span></h1>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default EmployerLogIn