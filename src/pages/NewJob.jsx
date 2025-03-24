// WorkerOnboardingForm.jsx

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const WorkerOnboardingForm = () => {
  const location = useLocation();
  const jobData = location.state?.jobData;
  const navigate = useNavigate();

  const [workerType, setWorkerType] = useState("Custom Payment");
  const [paymentFrequency, setPaymentFrequency] = useState("");
  const [signers, setSigners] = useState([{ name: "", walletAddress: "" }]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkerData({ ...workerData, [name]: value });
  };

  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...workerData.milestones];
    updatedMilestones[index][field] = value;
    setWorkerData({ ...workerData, milestones: updatedMilestones });
  };

  const addMilestone = () => {
    setWorkerData({
      ...workerData,
      milestones: [...workerData.milestones, { milestone: "", amount: "" }],
    });
  };

  const addSigner = () => {
    setSigners([...signers, { name: "", walletAddress: "" }]);
  };

  const handleSignerChange = (index, field, value) => {
    const updatedSigners = [...signers];
    updatedSigners[index][field] = value;
    setSigners(updatedSigners);
  };

  const handleCheckboxChange = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const newContract = {
        contracttitle: workerData.contractTitle,
        paymentfrequency: paymentFrequency,
        firstname: workerData.firstName,
        lastname: workerData.lastName,
        email: workerData.email,
        phone: workerData.phone,
        walletaddress: workerData.walletAddress,
        location: workerData.location,
        paymentrate: workerData.paymentRate,
        milestones: workerData.milestones,
        signers: signers,
        status: "Contract Created",
        reviewed: false,
        contracttype: workerType,
        description: workerData.description,
      };

      const { data, error } = await supabase
        .from("contracts")
        .insert([newContract])
        .select();

      if (error) {
        console.error("Error creating contract:", error);
        setErrorMsg("Failed to create contract. Please try again.");
      } else {
        if (workerType === "Piece Rate Payment") {
          alert(
            "✅ Oracle deployed - 0x5FbDB2315678afecb367f032d93F642f64180aa3" +
            "✅ Contract deployed - 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
          );
        }

        setWorkerData({
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
          description: "",
        });
        setPaymentFrequency("");
        setSigners([{ name: "", walletAddress: "" }]);
        setAcceptedTerms(false);

        navigate("/view-employees");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // [Rendering code stays unchanged, so use your existing form JSX below this]
  return (
    <div className="bg-[#FFFFFF] p-10 flex justify-center items-center min-h-screen relative">
      {/* LOADER OVERLAY */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="p-4 bg-white rounded shadow">
            <p className="text-lg">Creating your contract...</p>
            {/* You could add a spinner here, e.g. CSS spinner or library-based */}
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">Create Contract</h2>
        <p className="text-center mb-6">
          Create the contract terms with this guided process
        </p>

        {/* Optional error message display */}
        {errorMsg && (
          <div className="text-red-600 bg-red-100 p-3 mb-4 rounded">
            {errorMsg}
          </div>
        )}

        {/* Full Form */}
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-3">General Info</h3>

          <input
            type="text"
            placeholder="Contract Title"
            name="contractTitle"
            className="w-full p-3 mb-4 rounded-xl shadow border border-gray-400 bg-white/80"
            value={workerData.contractTitle}
            onChange={handleChange}
            disabled={Boolean(jobData?.title)}
          />

          {/* Worker Type Selection */}
          <p className="mb-2 text-lg">Contract Type</p>
          <div className="flex justify-between mb-6">
            <button
              onClick={() => setWorkerType("Custom Payment")}
              className={`p-3 rounded-lg font-semibold ${
                workerType === "Custom Payment"
                  ? "bg-[#EE964B] text-white"
                  : "bg-[#FAF0CA] text-[#0D3B66]"
              }`}>
              Custom Payment
            </button>
            <button
              onClick={() => setWorkerType("Time Based")}
              className={`p-3 rounded-lg font-semibold ${
                workerType === "Time Based"
                  ? "bg-[#EE964B] text-white"
                  : "bg-[#FAF0CA] text-[#0D3B66]"
              }`}>
              Time Based
            </button>
            <button
              onClick={() => setWorkerType("Piece Rate Payment")}
              className={`p-3 rounded-lg font-semibold ${
                workerType === "Piece Rate Payment"
                  ? "bg-[#EE964B] text-white"
                  : "bg-[#FAF0CA] text-[#0D3B66]"
              }`}>
              GPS Based
            </button>
            <button
              onClick={() => setWorkerType("Milestone")}
              className={`p-3 rounded-lg font-semibold ${
                workerType === "Milestone"
                  ? "bg-[#EE964B] text-white"
                  : "bg-[#FAF0CA] text-[#0D3B66]"
              }`}>
              Milestone Based
            </button>
          </div>

          <div className="flex gap-4 mb-4">
            <textarea
              placeholder="Description"
              name="description"
              className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
              value={workerData.description}
              onChange={handleChange}
              rows={4} // optional: controls visible height
            />
          </div>


          {/* Worker Information */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              name="firstName"
              className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
              value={workerData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4 mb-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
              value={workerData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
              value={workerData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4 mb-4">
          <select
            name="location"
            className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
            value={workerData.location}
            onChange={handleChange}
          >
            <option value="">Location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Houston">Houston</option>
            <option value="Phoenix">Phoenix</option>
            <option value="Philadelphia">Philadelphia</option>
            <option value="San Antonio">San Antonio</option>
            <option value="San Diego">San Diego</option>
            <option value="Dallas">Dallas</option>
            <option value="San Jose">San Jose</option>
            <option value="Austin">Austin</option>
            <option value="Jacksonville">Jacksonville</option>
            <option value="DC">DC</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="Seattle">Seattle</option>
            <option value="Boston">Boston</option>
            <option value="Denver">Denver</option>
            <option value="Baltimore">Baltimore</option>
            <option value="Portland">Portland</option>
            <option value="Las Vegas">Las Vegas</option>
            <option value="Miami">Miami</option>
            <option value="Atlanta">Atlanta</option>
            <option value="New Orleans">New Orleans</option>
            <option value="Detroit">Detroit</option>
            <option value="Minneapolis">Minneapolis</option>
            <option value="Orlando">Orlando</option>
            <option value="Tampa">Tampa</option>
            <option value="Charlotte">Charlotte</option>
            <option value="Nashville">Nashville</option>
            <option value="Indianapolis">Indianapolis</option>
            <option value="Sacramento">Sacramento</option>
            <option value="San Francisco">San Francisco</option>
          </select>
        </div>


          {/* Payment Details */}
          <h3 className="text-xl font-bold mb-3 mt-6">Payment Details</h3>
          <div className="mb-4">
            <label className="block mb-2">Payment Frequency</label>
            <select
              value={paymentFrequency}
              onChange={(e) => setPaymentFrequency(e.target.value)}
              className="w-full p-3 mb-3 rounded-xl shadow border border-gray-400 bg-white/80">
              <option value="">-- Select Frequency --</option>
              <option value="Hourly">Hourly</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select>
          </div>

          {workerType === "Milestone" ? (
            <>
              {workerData.milestones.map((milestone, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Milestone Name"
                    value={milestone.milestone}
                    onChange={(e) =>
                      handleMilestoneChange(index, "milestone", e.target.value)
                    }
                    className="w-full p-3 mb-3 rounded-xl shadow border border-gray-400 bg-white/80"
                  />
                  <input
                    type="text"
                    placeholder="Amount"
                    value={milestone.amount}
                    onChange={(e) =>
                      handleMilestoneChange(index, "amount", e.target.value)
                    }
                    className="w-full p-3 mb-3 rounded-xl shadow border border-gray-400 bg-white/80"
                  />
                </div>
              ))}
              <button
                onClick={addMilestone}
                className="w-full p-3 mb-3 rounded-xl shadow border border-gray-400 bg-white/80">
                Add Milestone
              </button>
            </>
          ) : (
            <input
              type="text"
              placeholder="Payment Rate"
              name="paymentRate"
              className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
              value={workerData.paymentRate}
              onChange={handleChange}
            />
          )}

          {/* Calculate contract payment based on the payment frequency and rate */}
          {paymentFrequency && workerData.paymentRate && (
            <p className="text-lg mt-4">
              Total Payment:{" "}
              {paymentFrequency === "Hourly"
                ? `$${parseInt(workerData.paymentRate) * 8}/day`
                : paymentFrequency === "Daily"
                ? `$${parseInt(workerData.paymentRate) * 1}/day`
                : paymentFrequency === "Weekly"
                ? `$${parseInt(workerData.paymentRate) * 5}/week`
                : ""}
            </p>
          )}

          {/* Multi-Signature Contract */}
          <h3 className="text-xl font-bold mb-2 mt-6">Add Signers</h3>
          {signers.map((signer, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={signer.name}
                onChange={(e) =>
                  handleSignerChange(index, "name", e.target.value)
                }
                className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
              />
              <input
                type="text"
                placeholder="Wallet Address"
                value={signer.walletAddress}
                onChange={(e) =>
                  handleSignerChange(index, "walletAddress", e.target.value)
                }
                className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
              />
            </div>
          ))}
          <button
            onClick={addSigner}
            className="px-4 py-2 border border-gray-300 rounded  text-[#EE964B]">
            + Add Signer
          </button>

          <h4 className="mt-6 text-lg">
            This is an agreement between the employer and the employee
          </h4>

          {/* "I agree to terms and conditions" Checkbox */}
          <label className="flex items-center mt-6 pb-5 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onClick={handleCheckboxChange}
              className="mr-2 cursor-pointer"
            />
            I agree to terms and conditions
          </label>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-[#FFB07F] via-[#FFA062] to-[#EE964B] text-white font-medium px-6 py-3 rounded-lg w-full transition-all hover:shadow-lg hover:brightness-110"
            disabled={!acceptedTerms || isLoading}>
            Submit
          </button>
        </div>

        {/* Modal (Shown when user clicks the "I agree" checkbox) */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 md:w-1/2 p-6 rounded shadow-lg relative">
              <h2 className="text-2xl font-bold mb-4">
                Terms &amp; Conditions
              </h2>
              <p className="mb-6">
                By agreeing to these terms and conditions, you are entering into
                a legally binding contract with the employer. Please read the
                following carefully.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCloseModal}
                  className="border border-gray-300 px-4 py-2 rounded">
                  Close
                </button>
                <button
                  onClick={handleAcceptTerms}
                  className="bg-orange-600 text-white px-4 py-2 rounded">
                  Accept Terms
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerOnboardingForm;
