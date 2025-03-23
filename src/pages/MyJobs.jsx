import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import Navbar from "../components/Navbar";

const MyJobs = () => {
  const [mycontracts, setMyContracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContracts = async () => {
      const { data, error } = await supabase.from("contracts").select("*");
      if (error) {
        console.error("Error fetching contracts:", error);
      } else {
        setMyContracts(data || []);
      }
    };
    fetchContracts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6]">
      <Navbar />
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-4xl p-10 font-bold text-orange-600">My Jobs</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {mycontracts.map((mycontract) => (
          <div
            key={mycontract.id}
            onClick={() => navigate(`/my-jobs/${mycontract.id}`)}
            className="bg-white p-8 rounded-lg shadow-md border-l-4 border-orange-500 cursor-pointer hover:shadow-lg transition duration-300"
          >
            <h2 className="text-2xl font-bold text-orange-600 mb-2">
              {mycontract.contracttitle}
            </h2>
            <p className="text-lg text-gray-600">
              <strong>Payment Rate:</strong> {mycontract.paymentrate}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Payment Frequency:</strong> {mycontract.paymentfrequency}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Location:</strong> {mycontract.location}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Status:</strong> {mycontract.status}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Applicants:</strong> {Array.isArray(mycontract.signers) ? mycontract.signers.length : 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
