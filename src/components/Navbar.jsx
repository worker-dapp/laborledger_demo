import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/Android.png";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("userRole"));
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(localStorage.getItem("userRole"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("userRole");
    setUser(null);
  };

  return (
    <div className=" w-full z-50 bg-[#0D3B66] shadow-md">
      <div className="max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between px-4 sm:px-8 py-3 gap-y-3">
        {/* Enhanced Brand Name */}
        <Link
          to="/"
          className="flex items-center gap-1 text-3xl font-bold tracking-wide">
          <img
            src={logo}
            alt="LucidLedger Logo"
            className="w-16 h-16 object-contain"
          />
          <span className="text-[#FFFFFF] hover:[#EE964B] transition-all">
            LUCID LEDGER
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-12 text-md">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-all font-medium ${
                isActive ? "text-[#EE964B] font-semibold" : "text-white"
              } hover:text-[#F4D35E]`
            }>
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `transition-all font-medium ${
                isActive ? "text-[#EE964B] font-semibold" : "text-white"
              } hover:text-[#F4D35E]`
            }>
            About Us
          </NavLink>

          {user ? (
            <Link
              to={
                user.role === "employee"
                  ? "/employee-profile"
                  : "/employer-profile"
              }
              className="bg-[#EE964B] text-white px-5 py-2 rounded-lg hover:bg-[#d97b33] transition-all shadow-md">
              Profile
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="bg-[#EE964B] hover:bg-[#d97b33] text-white px-4 py-1.5 rounded-lg transition-all shadow-md text-lg">
                Sign In
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg">
                  <Link
                    to="/employeeLogin"
                    className="block px-4 py-2 text-[#0D3B66] hover:bg-[#FAF0CA] transition-all rounded-t-lg">
                    Employee
                  </Link>
                  <Link
                    to="/employerLogin"
                    className="block px-4 py-2 text-[#0D3B66] hover:bg-[#FAF0CA] transition-all rounded-b-lg">
                    Employer
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
