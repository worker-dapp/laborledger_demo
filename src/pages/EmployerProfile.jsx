import React, { useEffect, useState } from "react";
import img from '../assets/profile.webp';
import Navbar from "../components/Navbar";
import supabase from "../supabaseClient";

const EmployerProfile = () => {
  const [employerData, setEmployerData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmployerData = async () => {
      const { data, error } = await supabase
        .from('employers')
        .select('first_name, last_name, email')
        .eq('email', localStorage.getItem('userEmail'));

      if (error) {
        setError(error);
      } else {
        setEmployerData(data[0]);
      }
    };

    getEmployerData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6]">
      <Navbar />
      <div className="flex flex-col justify-center items-center p-20 gap-10">
        <div className="flex items-center gap-8 text-5xl">
          <img 
            src={img} 
            alt={employerData?.first_name || "Profile"} 
            className="w-36 h-36 rounded-full" 
          />
          <p className="font-bold">
            {employerData ? `${employerData.first_name} ${employerData.last_name}` : "Loading..."}
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold pb-2">
            Email: <span className="font-medium">
              {employerData ? employerData.email : "Fetching..."}
            </span>
          </p>
          <h2 className="text-2xl font-semibold mb-2">
            Jobs Posted: <span className="pl-2">2</span>
          </h2>
        </div>
        {error && <p className="text-red-500 font-semibold">Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default EmployerProfile;
