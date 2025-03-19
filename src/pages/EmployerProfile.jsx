import React from "react";
import img from '../assets/profile.webp'
import Navbar from "../components/Navbar";

const EmployerProfile = () => {
  const employer = {
    name: "Tech Corp",
    jobCount: 5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6]">
        <Navbar />
      <div className="flex flex-col justify-center items-center p-20 gap-10">
        <div className="flex items-center gap-8 text-5xl">
            <img src={img} alt={employer.name} className="w-36 h-36 rounded-full" />
            <h1 className="font-bold">{employer.name}</h1>
        </div>
        <div>
            <h2 className="text-2xl font-semibold mb-2">Jobs Posted: <span className="pl-2">{employer.jobCount}</span></h2>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
