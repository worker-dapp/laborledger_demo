// WorkerOnboardingForm.jsx

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { ethers } from "ethers";

const WorkerOnboardingForm = () => {
  const location = useLocation();
  const jobData = location.state?.jobData;
  const navigate = useNavigate();

  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

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

  // Step navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Validation functions for each step
  const validateStep1 = () => {
    return workerData.contractTitle && workerData.description;
  };

  const validateStep2 = () => {
    return workerData.firstName && workerData.email && workerData.phone;
  };

  const validateStep3 = () => {
    return workerData.location && paymentFrequency;
  };

  const validateStep4 = () => {
    if (workerType === "Milestone") {
      return workerData.milestones.every(m => m.milestone && m.amount);
    }
    return workerData.paymentRate;
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return validateStep1();
      case 2: return validateStep2();
      case 3: return validateStep3();
      case 4: return validateStep4();
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMsg("");
  
    try {
      // Step 1: Prompt MetaMask connection and sign
      if (!window.ethereum) {
        alert("Please install MetaMask to proceed.");
        setIsLoading(false);
        return;
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      await signer.signMessage("Sign this message to confirm contract deployment on DAO Work Portal");
  
      // Step 2: Proceed with creating contract
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
  
      const { data: contractData, error: contractError } = await supabase
        .from("contracts")
        .insert([newContract])
        .select();
  
      if (contractError || !contractData || contractData.length === 0) {
        console.error("Error creating contract:", contractError);
        setErrorMsg("Failed to create contract. Please try again.");
        return;
      }
  
      const newContractId = contractData[0].id;
  
      if (workerType === "Piece Rate Payment") {
        alert(
          "✅ Oracle deployed - 0x5FbDB2315678afecb367f032d93F642f64180aa3" +
          "\n✅ Contract deployed - 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
        );
      }
  
      // Step 3: Calculate total payment
      let totalPayment = 0;
      const rate = parseFloat(workerData.paymentRate);
  
      if (paymentFrequency === "Hourly") totalPayment = rate * 8;
      else if (paymentFrequency === "Daily") totalPayment = rate * 1;
      else if (paymentFrequency === "Weekly") totalPayment = rate * 5;
  
      const userEmail = localStorage.getItem("userEmail");
  
      const { data: walletData, error: walletFetchError } = await supabase
        .from("wallets")
        .select("usd_balance")
        .eq("user_email", userEmail)
        .single();
  
      if (walletFetchError || !walletData) {
        console.error("Error fetching wallet:", walletFetchError);
        setErrorMsg("Could not find wallet info.");
        return;
      }
  
      const currentBalance = parseFloat(walletData.usd_balance);
      const remainingBalance = currentBalance - totalPayment;
  
      if (remainingBalance < 0) {
        setErrorMsg("Insufficient balance in your wallet.");
        return;
      }
  
      const { error: updateWalletError } = await supabase
        .from("wallets")
        .update({
          usd_balance: remainingBalance,
          latest_contract_id: newContractId,
          pay_for_job: totalPayment,
        })
        .eq("user_email", userEmail);
  
      if (updateWalletError) {
        console.error("Error updating wallet:", updateWalletError);
        setErrorMsg("Payment failed. Please try again.");
        return;
      }
  
      // Final confirmation
      alert(`✅ Contract deployed successfully!\n📝 Signed on MetaMask\n💵 $${totalPayment.toFixed(2)} deducted.\n💰 Remaining Balance: $${remainingBalance.toFixed(2)}`);
  
      // Reset form
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
      navigate("/review-applications");
  
    } catch (err) {
      console.error("MetaMask error or unexpected issue:", err);
      setErrorMsg("MetaMask signature required to proceed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Progress bar component
  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-[#FFB07F] via-[#FFA062] to-[#EE964B] h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Basic Info</span>
        <span>Worker Details</span>
        <span>Location & Payment</span>
        <span>Payment Details</span>
        <span>Review & Submit</span>
      </div>
    </div>
  );

  // Step 1: Basic Company Details
  const renderStep1 = () => (
    <div>
      <h3 className="text-xl font-bold mb-3">Step 1: Basic Contract Information</h3>
      
      <input
        type="text"
        placeholder="Contract Title"
        name="contractTitle"
        className="w-full p-3 mb-4 rounded-xl shadow border border-gray-400 bg-white/80"
        value={workerData.contractTitle}
        onChange={handleChange}
        disabled={Boolean(jobData?.title)}
      />

      <div className="mb-4">
        <label className="block mb-2 text-lg">Contract Type</label>
        <div className="grid grid-cols-2 gap-3">
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
      </div>

      <textarea
        placeholder="Contract Description"
        name="description"
        className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
        value={workerData.description}
        onChange={handleChange}
        rows={4}
      />
    </div>
  );

  // Step 2: Worker Information
  const renderStep2 = () => (
    <div>
      <h3 className="text-xl font-bold mb-3">Step 2: Worker Information</h3>
      
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
          value={workerData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
          value={workerData.lastName}
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

      <input
        type="text"
        placeholder="Wallet Address (Optional)"
        name="walletAddress"
        className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
        value={workerData.walletAddress}
        onChange={handleChange}
      />
    </div>
  );

  // Step 3: Location and Payment Frequency
  const renderStep3 = () => (
    <div>
      <h3 className="text-xl font-bold mb-3">Step 3: Location and Payment Frequency</h3>
      
      <div className="mb-4">
        <label className="block mb-2">Location</label>
        <select
          name="location"
          className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
          value={workerData.location}
          onChange={handleChange}
        >
          <option value="">Select Location</option>
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

      <div className="mb-4">
        <label className="block mb-2">Payment Frequency</label>
        <select
          value={paymentFrequency}
          onChange={(e) => setPaymentFrequency(e.target.value)}
          className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80">
          <option value="">-- Select Frequency --</option>
          <option value="Hourly">Hourly</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>
      </div>
    </div>
  );

  // Step 4: Payment Details
  const renderStep4 = () => (
    <div>
      <h3 className="text-xl font-bold mb-3">Step 4: Payment Details</h3>
      
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
                className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
              />
              <input
                type="text"
                placeholder="Amount"
                value={milestone.amount}
                onChange={(e) =>
                  handleMilestoneChange(index, "amount", e.target.value)
                }
                className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
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
        className="px-4 py-2 border border-gray-300 rounded text-[#EE964B]">
        + Add Signer
      </button>
    </div>
  );

  // Step 5: Review and Submit
  const renderStep5 = () => (
    <div>
      <h3 className="text-xl font-bold mb-3">Step 5: Review and Submit</h3>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 className="font-bold text-lg mb-4">Contract Summary</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Contract Title:</strong> {workerData.contractTitle}</p>
            <p><strong>Contract Type:</strong> {workerType}</p>
            <p><strong>Description:</strong> {workerData.description}</p>
            <p><strong>Worker Name:</strong> {workerData.firstName} {workerData.lastName}</p>
            <p><strong>Email:</strong> {workerData.email}</p>
            <p><strong>Phone:</strong> {workerData.phone}</p>
          </div>
          <div>
            <p><strong>Location:</strong> {workerData.location}</p>
            <p><strong>Payment Frequency:</strong> {paymentFrequency}</p>
            <p><strong>Payment Rate:</strong> {workerData.paymentRate}</p>
            <p><strong>Wallet Address:</strong> {workerData.walletAddress || 'Not provided'}</p>
            <p><strong>Signers:</strong> {signers.length}</p>
          </div>
        </div>

        {workerType === "Milestone" && (
          <div className="mt-4">
            <p><strong>Milestones:</strong></p>
            <ul className="list-disc list-inside">
              {workerData.milestones.map((milestone, index) => (
                <li key={index}>{milestone.milestone}: ${milestone.amount}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

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
    </div>
  );

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  return (
    <div className="bg-[#FFFFFF] p-10 flex justify-center items-center min-h-screen relative">
      {/* LOADER OVERLAY */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="p-4 bg-white rounded shadow">
            <p className="text-lg">Creating your contract...</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">Create Contract</h2>
        <p className="text-center mb-6">
          Create the contract terms with this guided process
        </p>

        {/* Progress Bar */}
        <ProgressBar />

        {/* Optional error message display */}
        {errorMsg && (
          <div className="text-red-600 bg-red-100 p-3 mb-4 rounded">
            {errorMsg}
          </div>
        )}

        {/* Current Step Content */}
        <div className="mt-4">
          {renderCurrentStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className={`px-6 py-3 rounded-lg font-medium ${
              currentStep === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
            disabled={currentStep === 1}>
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className={`px-6 py-3 rounded-lg font-medium ${
                canProceedToNext()
                  ? "bg-gradient-to-r from-[#FFB07F] via-[#FFA062] to-[#EE964B] text-white hover:shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!canProceedToNext()}>
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className={`px-6 py-3 rounded-lg font-medium ${
                acceptedTerms && !isLoading
                  ? "bg-gradient-to-r from-[#FFB07F] via-[#FFA062] to-[#EE964B] text-white hover:shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!acceptedTerms || isLoading}>
              {isLoading ? "Creating Contract..." : "Submit Contract"}
            </button>
          )}
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
