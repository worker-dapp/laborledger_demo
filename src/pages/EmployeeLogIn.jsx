import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import supabase from "../supabaseClient";

const EmployeeLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      // ✅ Fetch employee details from Supabase table
      const { data: employee, error: fetchError } = await supabase
        .from("employees")
        .select("id, email, password") // Ensure necessary fields
        .eq("email", email.trim().toLowerCase())
        .maybeSingle(); // Ensure only one result

      if (fetchError) throw fetchError;

      if (!employee) {
        setError("No account found with this email.");
        setLoading(false);
        return;
      }

      console.log("Stored Password:", employee.password);
      console.log("Entered Password:", password);

      // ✅ Compare entered password with stored password (plaintext match)
      if (employee.password !== password) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      console.log("Login Successful for:", employee.email);

      // ✅ Redirect to employee dashboard
      navigate("/employeeDashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center p-6 flex-grow">
        <div className="w-full max-w-lg p-10">
          {/* Centered Heading */}
          <h2 className="text-5xl font-semibold text-center text-[#0D3B66] mb-8">
            Employee Log In
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border border-[#F4D35E] bg-transparent rounded-xl placeholder-gray-600 text-gray-900"
            />

            {/* Password with Toggle */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 border border-[#F4D35E] bg-transparent rounded-xl placeholder-gray-600 text-gray-900 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-5 right-5 text-[#EDAA76] text-xl">
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>

            </div>

            {/* Log In Button */}
            <button
              type="submit"
              className="w-full font-medium p-4 bg-[#EE964B] hover:bg-[#d97b33] rounded-xl shadow-md transition-all hover:scale-105 hover:shadow-lg text-white"
              disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Register Link */}
          <Link to="/employeeRegister">
            <h1 className="text-gray-700 text-md pt-6 text-center">
              Don't have an account?
              <span className="text-[#EDAA76] underline cursor-pointer ml-1">
                Register Here
              </span>
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogIn;
