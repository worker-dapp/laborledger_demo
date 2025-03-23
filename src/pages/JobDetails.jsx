import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";
import Navbar from "../components/Navbar";

const JobDetails = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const fetchContract = async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching contract:", error);
      } else {
        setContract(data);
      }
    };

    fetchContract();
  }, [id]);

  if (!contract) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6]">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-20">
        <div className="max-w-3xl w-full">
          <h1 className="text-5xl font-bold text-orange-600 mb-4">{contract.contracttitle}</h1>
          <p className="text-2xl text-gray-600">
            <strong>Payment Rate :</strong> {contract.paymentrate}
          </p>
          <p className="text-2xl text-gray-600">
            <strong>Payment Frequency :</strong> {contract.paymentfrequency}
          </p>
          <p className="text-2xl text-gray-600">
            <strong>Location :</strong> {contract.location}
          </p>
          <p className="text-2xl text-gray-600">
            <strong>Status :</strong> {contract.status}
          </p>
          <p className="text-2xl text-gray-600">
            <strong>Description :</strong> {contract.description}
          </p>
          <p className="text-2xl text-gray-600 pb-10">
            <strong>Applicants :</strong> {Array.isArray(contract.signers) ? contract.signers.length : 0}
          </p>
          <button 
            onClick={() => console.log('Clicked')} 
            className='bg-orange-500 text-white px-20 py-2 cursor-pointer rounded-lg hover:bg-orange-600 transition-all shadow-md text-2xl'
          >
            Sign the Contract
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
