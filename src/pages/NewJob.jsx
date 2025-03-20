import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const WorkerOnboardingForm = () => {
  // 1) Grabbing the jobData from React Router
  const location = useLocation();
  const jobData = location.state?.jobData;

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
  });

  // 2) Prefill the form fields + signers with any available jobData
  useEffect(() => {
    if (jobData) {
      // Prefill your worker data
      setWorkerData((prev) => ({
        ...prev,
        contractTitle: jobData.title || "",
        location: jobData.location || "",
        paymentRate: jobData.salary || "",
        firstName: jobData.manager || "",
        paymentFrequency: jobData.schedule || "",
      }));

      // If jobData has an "applicants" array, we can prefill signers
      if (Array.isArray(jobData.applicants) && jobData.applicants.length > 0) {
        const mappedSigners = jobData.applicants.map((applicant) => ({
          name: applicant.name || "",
          walletAddress: applicant.walletAddress || "",
          isLocked: true,
        }));
        setSigners(mappedSigners);
      }
    }
  }, [jobData]);

  // Handle changes in the workerData fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkerData({ ...workerData, [name]: value });
  };

  // Handle changes in milestones
  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...workerData.milestones];
    updatedMilestones[index][field] = value;
    setWorkerData({ ...workerData, milestones: updatedMilestones });
  };

  // Add a new milestone row
  const addMilestone = () => {
    setWorkerData({
      ...workerData,
      milestones: [...workerData.milestones, { milestone: "", amount: "" }],
    });
  };

  // Add or remove signers
  const addSigner = () => {
    setSigners([...signers, { name: "", walletAddress: "" }]);
  };

  const handleSignerChange = (index, field, value) => {
    const updatedSigners = [...signers];
    updatedSigners[index][field] = value;
    setSigners(updatedSigners);
  };

  // Terms & Conditions Modal logic
  const handleCheckboxChange = (e) => {
    // We open the modal instead of directly setting acceptedTerms
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

  // Form Submit
  const handleSubmit = () => {
    console.log("Form submitted with data:", workerData, "Signers:", signers);
    // Add your submission logic (e.g., sending to server or Supabase)
  };

  return (
    <div className="bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6] p-10 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">Create Contract</h2>
        <p className="text-center mb-6">Create the contract terms with this guided process</p>

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
                workerType === "Custom Payment" ? "bg-orange-600 text-white" : "bg-gray-200"
              }`}
            >
              Custom Payment
            </button>
            <button
              onClick={() => setWorkerType("Time Based")}
              className={`p-3 rounded-lg font-semibold ${
                workerType === "Time Based" ? "bg-orange-600 text-white" : "bg-gray-200"
              }`}
            >
              Time Based
            </button>
            <button
              onClick={() => setWorkerType("Piece Rate Payment")}
              className={`p-3 rounded-lg font-semibold ${
                workerType === "Piece Rate Payment" ? "bg-orange-600 text-white" : "bg-gray-200"
              }`}
            >
              GPS Based
            </button>
            <button
              onClick={() => setWorkerType("Milestone")}
              className={`p-3 rounded-lg font-semibold ${
                workerType === "Milestone" ? "bg-orange-600 text-white" : "bg-gray-200"
              }`}
            >
              Milestone Based
            </button>
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
              disabled={Boolean(jobData?.manager)}
            />
            {/* <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
              value={workerData.lastName}
              onChange={handleChange}
            /> */}
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

          {/* Payment Details */}
          <h3 className="text-xl font-bold mb-3 mt-6">Payment Details</h3>

          <div className="mb-4">
            {/* <label className="block mb-2">Payment Frequency</label>
            <select
              value={paymentFrequency}
              onChange={(e) => setPaymentFrequency(e.target.value)}
              className="w-full p-3 mb-3 rounded-xl shadow border border-gray-400 bg-white/80"
            >
              <option value="Hourly">Hourly</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select> */}
            <input
              type="text"
              placeholder="Payment Frequency"
              name="paymentFrequency"
              className="w-full p-3 rounded-xl shadow border border-gray-400 bg-white/80"
              value={workerData.paymentFrequency}
              onChange={handleChange}
            />
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
                className="w-full p-3 mb-3 rounded-xl shadow border border-gray-400 bg-white/80"
              >
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

          {/* Multi-Signature Contract */}
          <h3 className="text-xl font-bold mb-2 mt-6">Add Signers</h3>
          {signers.map((signer, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={signer.name}
                onChange={(e) => handleSignerChange(index, "name", e.target.value)}
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
            className="px-4 py-2 border border-gray-300 rounded text-orange-600"
          >
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
            className="bg-gradient-to-r from-[#FFB07F] via-[#FFA062] to-[#E08A44] text-white font-medium px-6 py-3 rounded-lg w-full transition-all hover:shadow-lg hover:brightness-110"
            disabled={!acceptedTerms}
          >
            Submit
          </button>
        </div>

        {/* Modal (Shown when user clicks the "I agree" checkbox) */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 md:w-1/2 p-6 rounded shadow-lg relative">
              <h2 className="text-2xl font-bold mb-4">Terms &amp; Conditions</h2>
              <p className="mb-6">
                By agreeing to these terms and conditions, you are entering into a legally
                binding contract with the employer. Please read the following carefully.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCloseModal}
                  className="border border-gray-300 px-4 py-2 rounded"
                >
                  Close
                </button>
                <button
                  onClick={handleAcceptTerms}
                  className="bg-orange-600 text-white px-4 py-2 rounded"
                >
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
