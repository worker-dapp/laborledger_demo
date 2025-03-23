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
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6]">
      <Navbar />
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-4xl p-10 font-bold text-orange-600">Available Jobs</h1>
        <Link to='/my-jobs' className="text-4xl p-10 font-bold text-orange-600">My Jobs</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {contracts.map((contract) => (
          <div
            key={contract.id}
            onClick={() => navigate(`/job-details/${contract.id}`)}
            className="bg-white p-8 rounded-lg shadow-md border-l-4 border-orange-500 cursor-pointer hover:shadow-lg transition duration-300"
          >
            <h2 className="text-2xl font-bold text-orange-600 mb-2">
              {contract.contracttitle}
            </h2>
            <p className="text-lg text-gray-600">
              <strong>Payment Rate:</strong> {contract.paymentrate}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Payment Frequency:</strong> {contract.paymentfrequency}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Location:</strong> {contract.location}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Status:</strong> {contract.status}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Applicants:</strong> {Array.isArray(contract.signers) ? contract.signers.length : 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
