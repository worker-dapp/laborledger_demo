import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import Navbar from "../components/Navbar";

const ReviewCompletedContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [ownerBalance, setOwnerBalance] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("status", "closed");

      if (error) {
        console.error("Error fetching closed contracts:", error);
        return;
      }

      const processed = (data || []).map((contract) => {
        let signers = [];

        if (typeof contract.signers === "string") {
          try {
            signers = JSON.parse(contract.signers);
          } catch (e) {
            console.warn(`Could not parse signers for contract ${contract.id}`);
          }
        } else if (Array.isArray(contract.signers)) {
          signers = contract.signers;
        }

        const applicants = Array.isArray(signers)
          ? signers.filter((s) => s.name && s.name.trim() !== "").length
          : 0;

        return {
          ...contract,
          applicants,
          signers,
        };
      });

      setContracts(processed);
      setFilteredContracts(processed);
    };

    fetchContracts();
  }, []);

  useEffect(() => {
    filterContracts();
  }, [searchTitle, contracts]);

  const filterContracts = () => {
    let updated = [...contracts];
    if (searchTitle.trim() !== "") {
      updated = updated.filter((contract) =>
        contract.contracttitle?.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }
    setFilteredContracts(updated);
  };

  const handleViewDetails = async (contract) => {
    setSelectedContract(contract);

    const { data, error } = await supabase
      .from("wallets")
      .select("usd_balance")
      .eq("user_email", contract.email)
      .single();

    if (error || !data) {
      console.error("Failed to fetch wallet balance:", error);
      setOwnerBalance("Unavailable");
    } else {
      setOwnerBalance(parseFloat(data.usd_balance).toFixed(2));
    }
  };

  const handleNotification = async (type) => {
    if (!selectedContract) return;
  
    const message =
      type === "approved"
        ? "✅ Your punches have been approved. Check your wallet in 30 mins."
        : "❌ Your punches are rejected. Please contact your manager.";
  
    const { error } = await supabase.from("notifications").insert([
      {
        contract_id: selectedContract.id,
        worker_email: selectedContract.email,
        status: type,
        message,
      },
    ]);
  
    if (error) {
      console.error("❌ Failed to insert notification:", error);
    } else {
      console.log("✅ Notification sent:", type);
    }
  
    setSelectedContract(null); // Close modal
  };
  

  return (
    <div className="relative min-h-screen p-6 bg-[#FFFFFF]">

      {/* Header */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-6 mt-6">
        <h1 className="text-3xl font-bold text-[#0D3B66]">Closed Contracts</h1>
        <Link
          to="/new-job"
          className="bg-[#EE964B] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#d97b33] transition"
        >
          Create a new Contract
        </Link>
      </div>

      {/* Filters Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white shadow-md border 
                   flex items-center justify-center text-[#EE964B] hover:bg-orange-50 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M8 12h8m-6 8h4" />
        </svg>
      </button>

      {/* Filters Panel */}
      {showFilters && (
        <div className="absolute top-20 left-6 w-64 bg-white p-4 rounded shadow-md border transition-all z-50">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="searchTitle">
              Search Contract Title
            </label>
            <input
              id="searchTitle"
              type="text"
              placeholder="e.g. My Contract"
              className="w-full p-2 border rounded"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>

          <button
            className="mt-2 w-full bg-[#EE964B] text-white py-2 rounded shadow cursor-pointer"
            onClick={() => setShowFilters(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Contract Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto mt-8">
        {filteredContracts.length > 0 ? (
          filteredContracts.map((contract) => (
            <div
              key={contract.id}
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#F4D35E]"
            >
              <h2 className="text-lg font-bold text-[#EE964B] mb-2">
                {contract.contracttitle}
              </h2>
              <p className="text-sm text-[#0D3B66]">
                <strong>Payment Rate:</strong> {contract.paymentrate}
              </p>
              <p className="text-sm text-[#0D3B66]">
                <strong>Payment Frequency:</strong> {contract.paymentfrequency}
              </p>
              <p className="text-sm text-[#0D3B66]">
                <strong>Location:</strong> {contract.location}
              </p>
              <p className="text-sm text-[#0D3B66]">
                <strong>Status:</strong> {contract.status}
              </p>
              <p className="text-sm text-[#0D3B66]">
                <strong>Applicants:</strong>{" "}
                {contract.applicants}
              </p>
              <button
                onClick={() => handleViewDetails(contract)}
                className="mt-4 block w-full bg-[#EE964B] text-white px-4 py-2 rounded-full shadow-md text-center"
              >
                Approve
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full text-lg">
            No closed contracts found.
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setSelectedContract(null)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-[#EE964B] mb-4">
              {selectedContract.contracttitle}
            </h2>

            <p><strong>Payment Rate:</strong> {selectedContract.paymentrate}</p>
            <p><strong>Payment Frequency:</strong> {selectedContract.paymentfrequency}</p>
            <p><strong>Location:</strong> {selectedContract.location}</p>
            <p><strong>Status:</strong> {selectedContract.status}</p>
            <p><strong>Applicants:</strong> {selectedContract.signers.map(s => s.name).join(", ")}</p>

            <div className="mt-4 text-lg text-[#0D3B66]">
              💰 <strong>Remaining Balance:</strong>{" "}
              {ownerBalance !== null ? `$${ownerBalance}` : "Loading..."}
            </div>

            <button
              className="mt-6 w-full bg-green-600 text-white py-2 rounded-full shadow-md hover:bg-green-700 transition"
              onClick={() => handleNotification("approved")}
            >
              Approve
            </button>
            <button
              className="mt-3 w-full bg-red-600 text-white py-2 rounded-full shadow-md hover:bg-red-700 transition"
              onClick={() => handleNotification("rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCompletedContracts;
