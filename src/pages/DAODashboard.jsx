import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Navbar from "../components/Navbar";

const DaoDashboard = () => {
  const [walletInfo, setWalletInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) return;

      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_email", email)
        .single();

      if (error) {
        console.error("Error fetching wallet info:", error);
      } else {
        setWalletInfo(data);
      }
      setLoading(false);
    };

    fetchWallet();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-lg">Loading DAO Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] relative">
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-20">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-xl border">
          <h2 className="text-3xl font-bold text-center text-[#0D3B66] mb-6">
            {walletInfo.wallet_address.slice(0, 16)}...'s Overview
          </h2>

          {walletInfo ? (
            <>
              <p className="text-md text-gray-700 mb-2">
                🧾 <strong>Wallet Address:</strong>{" "}
                {walletInfo.wallet_address.slice(0, 6)}...
                {walletInfo.wallet_address.slice(-4)}
              </p>
              <p className="text-lg mb-2">
                💰 <strong>Current Balance:</strong>{" "}
                <span className="text-green-600">
                  ${parseFloat(walletInfo.usd_balance).toFixed(2)}
                </span>
              </p>
              <p className="text-md text-gray-600 mb-2">
                🪙 <strong>Original Balance:</strong>{" "}
                ${parseFloat(walletInfo.initial_usd_balance).toFixed(2)}
              </p>
              <p className="text-md text-gray-600">
                🕓 <strong>Recent Transaction:</strong>{" "}
                <span className="text-red-600 font-semibold">
                    ${(
                    parseFloat(walletInfo.initial_usd_balance) -
                    parseFloat(walletInfo.usd_balance)
                    ).toFixed(2)}
                </span>{" "}
                was sent from <strong>{walletInfo.user_email}</strong> on{" "}
                <em>{new Date(walletInfo.updated_at).toLocaleString()}</em>
              </p>


            </>
          ) : (
            <p className="text-red-500">No wallet connected or found.</p>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaoDashboard;
