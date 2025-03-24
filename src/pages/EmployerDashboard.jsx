import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, CheckCircle, XCircle } from "lucide-react";
import supabase from "../supabaseClient";
import Navbar from "../components/Navbar";

const EmployerDashboard = () => {
  const [userName, setUserName] = useState("");
  const [showMessages, setShowMessages] = useState(false);
  const [unreviewedContracts, setUnreviewedContracts] = useState([]);

  useEffect(() => {
    const fetchUser = () => {
  const email = localStorage.getItem("userEmail");
  if (email) {
    setUserName(email.split("@")[0]);
  }
};

    const fetchUnreviewedContracts = async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("id, contracttitle, signers")
        .eq("status", "open")
        .eq("reviewed", false);

      if (!error && data) {
        setUnreviewedContracts(data);
      }
    };

    fetchUser();
    fetchUnreviewedContracts();
  }, []);

  const handleReview = async (id) => {
    const { error } = await supabase
      .from("contracts")
      .update({ reviewed: true })
      .eq("id", id);

    if (!error) {
      setUnreviewedContracts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] relative">
      <Navbar />
      <div className="absolute top-4 right-6">
        <button
          onClick={() => setShowMessages(!showMessages)}
          className="relative p-2 rounded-full bg-orange-100 hover:bg-orange-200 transition"
        >
          <Bell className="text-orange-600" />
{unreviewedContracts.length > 0 && (
  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
    {unreviewedContracts.length}
  </span>
)}
        </button>
        {showMessages && (
          <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-10">
            <h4 className="text-md font-semibold text-gray-900 mb-2">Unreviewed Contracts</h4>
            {unreviewedContracts.length === 0 ? (
              <p className="text-sm text-gray-600">No unreviewed contracts.</p>
            ) : (
              <ul className="space-y-3">
                {unreviewedContracts.map((contract) => (
                  <li key={contract.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-800 truncate">
  {Array.isArray(contract.signers) && contract.signers.length > 0
    ? `${contract.signers[0].name} has accepted the contract:`
    : "Someone has accepted the contract:"} <strong>{contract.contracttitle}</strong>
</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReview(contract.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button
                        onClick={() => setUnreviewedContracts((prev) => prev.filter((c) => c.id !== contract.id))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <div>
        <div className="text-3xl text-center p-12">Welcome, {userName}!</div>
        <div className="flex flex-wrap justify-center gap-12 p-12">
          <Link
            to="/new-job"
            className="w-1/4 text-center p-10 rounded-2xl shadow-2xl font-medium text-2xl border border-gray-100 bg-gradient-to-b from-[#FAF0CA] to-white backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] text-gray-900"
          >
            Create New Contract
          </Link>
          <Link
            to="/view-employees"
            className="w-1/4 text-center p-10 rounded-2xl shadow-2xl font-medium text-2xl border border-gray-100 bg-gradient-to-b from-[#FAF0CA] to-white backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] text-gray-900"
          >
            Review Applications
          </Link>
          <Link
            to="/view-employees"
            className="w-1/4 text-center p-10 rounded-2xl shadow-2xl font-medium text-2xl border border-gray-100 bg-gradient-to-b from-[#FAF0CA] to-white backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] text-gray-900"
          >
            View Open Contracts
          </Link>
          <Link
            to="/new-job"
            className="w-1/4 text-center p-10 rounded-2xl shadow-2xl font-medium text-2xl border border-gray-100 bg-gradient-to-b from-[#FAF0CA] to-white backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] text-gray-900"
          >
            Review Completed Contracts
          </Link>
          <Link
            to="/dispute"
            className="w-1/4 text-center p-10 rounded-2xl shadow-2xl font-medium text-2xl border border-gray-100 bg-gradient-to-b from-[#FAF0CA] to-white backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] text-gray-900"
          >
            View Ongoing Disputes
          </Link>
          <Link
            to="/payments"
            className="w-1/4 text-center p-10 rounded-2xl shadow-2xl font-medium text-2xl border border-gray-100 bg-gradient-to-b from-[#FAF0CA] to-white backdrop-blur-lg transition-all hover:shadow-2xl hover:scale-[1.03] text-gray-900"
          >
            View Closed Contracts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
