import React, { useState, useEffect } from "react";
import img from '../assets/profile.webp'
import Navbar from "../components/Navbar";
import supabase from "../supabaseClient";

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => {
    const getEmployeeData = async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('first_name, last_name, email')
        .eq('email', localStorage.getItem('userEmail'));

      if (error) {
        setError(error);
        setLoading(false);
      } else {
        setEmployeeData(data[0]); 
        setLoading(false); 
      }

      console.log(data);
    };
    getEmployeeData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6]">
      <Navbar />
      <div className="flex flex-col justify-center items-center p-20 gap-10">
        <div className="flex items-center gap-8 text-5xl">
          <img src={img} alt={employeeData.first_name} className="w-36 h-36 rounded-full" />
          <p className="font-bold">{employeeData.first_name} {employeeData.last_name}</p>
        </div>
        <div>
          <p className="text-2xl font-bold pb-2">Email : <span className="font-medium">{employeeData.email}</span></p>
          <h2 className="text-2xl font-semibold mb-2">Jobs Posted: <span className="pl-2">2</span></h2>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
