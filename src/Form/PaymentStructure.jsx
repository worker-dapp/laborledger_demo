import React, { useState } from "react";

export default function PaymentStructure({ formData, handleChange }) {
  const [paymentType, setPaymentType] = useState(formData.paymentType || "time-based");
  
  const jobTypes = ["Full Time", "Part Time", "Temporary", "Contract", "Permanent (employee)"];
  const currencies = ["USD", "EUR", "GBP", "INR", "JPY"];
  
  // Enhanced payment structures
  const paymentTypes = [
    { id: "time-based", label: "Time-Based", description: "Hourly, daily, weekly, monthly" },
    { id: "piece-rate", label: "Piece-Rate", description: "Per unit, per item, per task" },
    { id: "milestone", label: "Milestone-Based", description: "Project phases, time periods" },
    { id: "volume", label: "Volume-Based", description: "Weight, quantity, area covered" },
    { id: "custom", label: "Custom", description: "Hybrid or custom payment structure" }
  ];

  const timeFrequencies = ["hourly", "per day", "per week", "per month"];
  const pieceRateUnits = ["per item", "per unit", "per task", "per piece", "per box", "per pallet"];
  const milestoneTypes = ["project phases", "time periods", "deliverables", "checkpoints"];
  const volumeUnits = ["per kg", "per ton", "per square meter", "per cubic meter", "per liter"];

  const additionalCompOptions = ["Bonus", "Commission", "Tip"];
  const benefits = [
    "Food and Drink",
    "Life Insurance",
    "Medical Insurance",
    "Mobile Phone",
    "Paid Sick Days",
    "Paid Time Off",
    "Parental Paid Leave",
    "Provident Fund",
    "Retirement/Pension",
    "Transportation Allowance",
  ];

  const handleMultiToggleChange = (value, field) => {
    const currentValues = formData[field]?.split(",").filter(Boolean) || [];
    const isSelected = currentValues.includes(value);
    const updatedValues = isSelected
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    handleChange({
      target: {
        name: field,
        value: updatedValues.join(","),
      },
    });
  };

  const handleMultiCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    const currentValues = formData[field]?.split(",").filter(Boolean) || [];
    const updatedValues = checked
      ? [...new Set([...currentValues, value])]
      : currentValues.filter((v) => v !== value);
    handleChange({
      target: {
        name: field,
        value: updatedValues.join(","),
      },
    });
  };

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    handleChange({ target: { name: "paymentType", value: type } });
    // Reset payment frequency when changing type
    handleChange({ target: { name: "payFrequency", value: "" } });
  };

  const renderPaymentDetails = () => {
    switch (paymentType) {
      case "time-based":
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Pay Frequency</label>
              <select
                name="payFrequency"
                value={formData.payFrequency || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Frequency</option>
                {timeFrequencies.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case "piece-rate":
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Unit Type</label>
              <select
                name="payFrequency"
                value={formData.payFrequency || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Unit</option>
                {pieceRateUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Expected Units per Day</label>
              <input
                type="number"
                name="expectedUnits"
                value={formData.expectedUnits || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="e.g., 100 items per day"
              />
            </div>
          </div>
        );

      case "milestone":
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Milestone Type</label>
              <select
                name="payFrequency"
                value={formData.payFrequency || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Milestone Type</option>
                {milestoneTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Number of Milestones</label>
              <input
                type="number"
                name="milestoneCount"
                value={formData.milestoneCount || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="e.g., 5 project phases"
              />
            </div>
          </div>
        );

      case "volume":
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Volume Unit</label>
              <select
                name="payFrequency"
                value={formData.payFrequency || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Unit</option>
                {volumeUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Expected Volume per Day</label>
              <input
                type="number"
                name="expectedVolume"
                value={formData.expectedVolume || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="e.g., 500 kg per day"
              />
            </div>
          </div>
        );

      case "custom":
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Custom Payment Description</label>
              <textarea
                name="customPaymentDesc"
                value={formData.customPaymentDesc || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Describe your custom payment structure..."
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Job Type Buttons */}
      <div>
        <label className="block text-lg font-medium mb-2">Job Type</label>
        <div className="flex flex-wrap gap-2">
          {jobTypes.map((type) => (
        <button
              key={type}
          type="button"
              onClick={() =>
                handleChange({ target: { name: "JObType", value: type } })
              }
              className={`px-4 py-2 rounded border ${
                formData.JObType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {type}
        </button>
          ))}
        </div>
      </div>

      {/* Payment Type Selection */}
      <div>
        <label className="block text-lg font-medium mb-2">Payment Structure</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {paymentTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handlePaymentTypeChange(type.id)}
              className={`p-4 rounded-lg border text-left transition-all ${
                paymentType === type.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              <div className="font-medium">{type.label}</div>
              <div className={`text-sm mt-1 ${
                paymentType === type.id ? "text-blue-100" : "text-gray-600"
              }`}>
                {type.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pay Amount */}
      <div>
        <label className="block text-lg font-medium mb-2">
          What does this job pay?
        </label>
        <input
          type="number"
          name="jobPay"
          value={formData.jobPay}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Enter pay amount"
        />
        </div>

      {/* Currency */}
      <div>
        <label className="block font-medium mb-1">Currency</label>
        <select
          name="currency"
          value={formData.currency || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Currency</option>
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic Payment Details */}
      {renderPaymentDetails()}

      {/* Additional Compensation Checkboxes */}
      <div>
        <label className="block text-lg font-medium mb-2">
          Additional Compensation
        </label>
        <div className="flex gap-4 flex-wrap">
          {additionalCompOptions.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={option}
                checked={
                  formData.additionalCompensation
                    ?.split(",")
                    .includes(option) || false
                }
                onChange={(e) =>
                  handleMultiCheckboxChange(e, "additionalCompensation")
                }
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Employee Benefits as Buttons */}
      <div>
        <label className="block text-lg font-medium mb-2">
          Employee Benefits
        </label>
        <div className="flex flex-wrap gap-2">
          {benefits.map((benefit) => {
            const selected =
              formData.employeeBenefits?.split(",").includes(benefit);
            return (
              <button
                key={benefit}
                type="button"
                onClick={() =>
                  handleMultiToggleChange(benefit, "employeeBenefits")
                }
                className={`px-3 py-2 rounded border ${
                  selected
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {benefit}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 