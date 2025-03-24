import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import Navbar from "../components/Navbar";

const EmployeeDashboard = () => {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContracts = async () => {
      const { data, error } = await supabase.from("contracts").select("*");
      if (error) {
        console.error("Error fetching contracts:", error);
      } else {
        setContracts(data || []);
      }
    };
    fetchContracts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Navbar />
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-4xl p-10 font-bold text-[#0D3B66]">
          Available Jobs
        </h1>
        <Link to="/my-jobs" className="text-4xl p-10 font-bold text-[#0D3B66]">
          My Jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {contracts.map((contract) => (
          <div
          key={contract.id}
          className="bg-white p-8 rounded-lg shadow-md border-l-4 border-[#F4D35E] hover:shadow-lg transition duration-300 flex flex-col justify-between"
        >
          <div onClick={() => navigate(`/job-details/${contract.id}`)} className="cursor-pointer">
            <h2 className="text-2xl font-bold text-[#EE964B] mb-2">
              {contract.contracttitle}
            </h2>
            <p className="text-lg text-[#0D3B66]">
              <strong>Payment Rate:</strong> {contract.paymentrate}
            </p>
            <p className="text-lg text-[#0D3B66]">
              <strong>Payment Frequency:</strong> {contract.paymentfrequency}
            </p>
            <p className="text-lg text-[#0D3B66] mb-4">
              <strong>Location:</strong> {contract.location}
            </p>
          </div>
          <button
            onClick={() => navigate(`/job-details/${contract.id}`)}
            className="bg-orange-500 text-white py-2 cursor-pointer rounded-lg hover:bg-orange-400 transition-all shadow-md text-xl w-32"
            >
            View
          </button>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
