import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import Navbar from "../components/Navbar";

const ViewOpenContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchContracts = async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("status", "open"); // Only fetch open contracts

      if (error) {
        console.error("Error fetching open contracts:", error);
        return;
      }

      // Process signers to calculate applicants
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
        };
      });

      setContracts(processed);
      setFilteredContracts(processed);
    };

    fetchContracts();
  }, []);

  useEffect(() => {
    filterContracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div className="relative min-h-screen p-6 bg-[#FFFFFF]">

      {/* TOP BAR */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-6 mt-6">
        <h1 className="text-3xl font-bold text-[#0D3B66]">Open Contracts</h1>
        <Link
          to="/new-job"
          className="bg-[#EE964B] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#d97b33] transition"
        >
          Create a new Contract
        </Link>
      </div>

      {/* FILTER BUTTON */}
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

      {/* FILTER PANEL */}
      {showFilters && (
        <div
          className="absolute top-20 left-6 w-64 bg-white p-4 rounded shadow-md border 
                     transition-all"
          style={{ zIndex: 9999 }}
        >
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

      {/* CONTRACT CARDS */}
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
                <strong>Applicants:</strong> {contract.applicants}
              </p>
              <Link
                to={`/contracts/${contract.id}`}
                className="mt-4 block w-full bg-[#EE964B] text-white px-4 py-2 rounded-full shadow-md text-center"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full text-lg">
            No open contracts found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOpenContracts;
