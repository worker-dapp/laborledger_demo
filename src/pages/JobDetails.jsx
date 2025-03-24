import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workerType, setWorkerType] = useState("Custom Payment");
  const [paymentFrequency, setPaymentFrequency] = useState("");
  const [signers, setSigners] = useState([{ name: "", walletAddress: "" }]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [workerData, setWorkerData] = useState({
    contractTitle: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    walletAddress: "",
    location: "",
    paymentRate: "",
    milestones: [{ milestone: "", amount: "" }],
    paymentFrequency: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchContract = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching contract:", error);
        setErrorMsg("Failed to load contract.");
      } else {
        setWorkerData({
          contractTitle: data.contracttitle || "",
          firstName: data.firstname || "",
          lastName: data.lastname || "",
          email: data.email || "",
          phone: data.phone || "",
          walletAddress: data.walletaddress || "",
          location: data.location || "",
          paymentRate: data.paymentrate || "",
          milestones: data.milestones?.length ? data.milestones : [{ milestone: "", amount: "" }],
          paymentFrequency: data.paymentfrequency || "",
        });
        setWorkerType(data.contracttype || "Custom Payment");
        setPaymentFrequency(data.paymentfrequency || "");
        setSigners(data.signers?.length ? data.signers : [{ name: "", walletAddress: "" }]);
      }
      setIsLoading(false);
    };

    fetchContract();
  }, [id]);

  const handleSubmit = async () => {
    if (!acceptedTerms) return;

    const { error } = await supabase
      .from("contracts")
      .update({ status: "open" })
      .eq("id", id);

    if (error) {
      console.error("Failed to update contract status:", error);
      setErrorMsg("Failed to sign the contract. Please try again.");
    } else {
      navigate("/employeeDashboard");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex justify-center items-center">
        <h2 className="text-2xl text-[#EE964B]">Loading...</h2>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex justify-center items-center">
        <h2 className="text-2xl text-[#EE964B]">{errorMsg}</h2>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Contract</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contract Title</label>
            <input
              type="text"
              name="contractTitle"
              className="w-full p-3 rounded-xl border bg-gray-100"
              value={workerData.contractTitle}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="firstName"
              className="w-full p-3 rounded-xl border bg-gray-100"
              value={workerData.firstName}
              readOnly
            />
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 rounded-xl border bg-gray-100"
                value={workerData.email}
                readOnly
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="w-full p-3 rounded-xl border bg-gray-100"
                value={workerData.phone}
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              className="w-full p-3 rounded-xl border bg-gray-100"
              value={workerData.location}
              readOnly
            />
          </div>

          <h3 className="text-lg font-bold">Payment Details</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Frequency</label>
            <input
              type="text"
              name="paymentFrequency"
              className="w-full p-3 rounded-xl border bg-gray-100"
              value={workerData.paymentFrequency}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Rate</label>
            <input
              type="text"
              name="paymentRate"
              className="w-full p-3 rounded-xl border bg-gray-100"
              value={workerData.paymentRate}
              readOnly
            />
          </div>

          <h3 className="text-lg font-bold">Signers</h3>
          {signers.map((signer, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={signer.name}
                  className="w-full p-3 rounded-xl border bg-gray-100"
                  readOnly
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
                <input
                  type="text"
                  value={signer.walletAddress}
                  className="w-full p-3 rounded-xl border bg-gray-100"
                  readOnly
                />
              </div>
            </div>
          ))}

          <label className="flex items-center mt-4 space-x-2 text-sm text-gray-800">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-orange-500"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <span>I agree to terms and conditions</span>
          </label>

          <button
            onClick={handleSubmit}
            disabled={!acceptedTerms}
            className="w-full mt-6 py-3 bg-gradient-to-r from-[#FFB07F] via-[#FFA062] to-[#EE964B] text-white font-medium rounded-lg shadow hover:brightness-105 transition-all"
          >
            Sign the Contract
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
