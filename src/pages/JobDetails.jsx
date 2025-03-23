import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";
import Navbar from "../components/Navbar";

const JobDetails = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchContract = async () => {
      setLoading(true);
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
      setLoading(false); 
    };

    fetchContract();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6] flex justify-center items-center">
        <h2 className="text-2xl text-orange-600">Loading...</h2> {/* Show a loading message */}
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6] flex justify-center items-center">
        <h2 className="text-2xl text-orange-600">Contract not found</h2> {/* Handle case when contract is not found */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6] pb-20">
      <Navbar />
      <div className="text-4xl text-orange-600 font-bold text-center p-12">{contract.contracttitle} Details</div>
      <div className="w-2/3 mx-auto p-10">
        <p className="text-2xl"><strong>Description:</strong></p>
        <p className="text-2xl"><strong>Payment Rate :</strong> {contract.paymentrate}</p>
        <p className="text-2xl"><strong>Payment Frequency :</strong> {contract.paymentfrequency}</p>
        <p className="text-2xl"><strong>Location :</strong> {contract.location}</p>
        <p className="text-2xl pb-10"><strong>Applicants :</strong> {Array.isArray(contract.signers) ? contract.signers.length : 0}</p>
          <button 
            onClick={() => console.log('Clicked')} 
            className='bg-orange-500 text-white px-20 py-2 cursor-pointer rounded-lg hover:bg-orange-600 transition-all shadow-md text-2xl'
          >
            Sign the Contract
          </button>
      </div>
      
    </div>
  );
}

export default JobDetails;
