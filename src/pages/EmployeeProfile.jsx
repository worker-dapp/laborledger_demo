import React, { useState, useEffect } from "react";
import img from '../assets/profile.webp';
import Navbar from "../components/Navbar";
import supabase from "../supabaseClient";

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmployeeData = async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('first_name, last_name, email')
        .eq('email', localStorage.getItem('userEmail'));

        console.log(data);

      if (error) {
        setError(error);
      } else {
        setEmployeeData(data[0]);
      }
    };

    getEmployeeData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6]">
      <Navbar />
      <div className="flex flex-col justify-center items-center p-20 gap-10">
        <div className="flex items-center gap-8 text-5xl">
          <img 
            src={img} 
            alt={employeeData?.first_name || "Profile"} 
            className="w-36 h-36 rounded-full" 
          />
          <p className="font-bold">
            {employeeData ? `${employeeData.first_name} ${employeeData.last_name}` : "Loading..."}
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold pb-2">
            Email: <span className="font-medium">
              {employeeData ? employeeData.email : "Fetching..."}
            </span>
          </p>
          <h2 className="text-2xl font-semibold mb-2">
            Jobs Completed: <span className="pl-2">2</span>
          </h2>
        </div>
        {error && <p className="text-red-500 font-semibold">Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default EmployeeProfile;
