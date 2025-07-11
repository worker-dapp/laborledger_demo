import React, { useState, useEffect } from "react";

export default function OracleConfiguration({ formData, handleChange }) {
  const [selectedOracles, setSelectedOracles] = useState(formData.selectedOracles || []);
  const [oracleCost, setOracleCost] = useState(formData.oracleCost || 0);

  // Oracle definitions with costs and descriptions
  const oracleOptions = {
    "gps": {
      name: "GPS Oracle",
      description: "Location-based work verification",
      cost: 5, // $5 per verification
      suitableFor: ["time-based", "milestone"],
      features: ["Location tracking", "Attendance verification", "Route validation"]
    },
    "image": {
      name: "Image Oracle",
      description: "Photo evidence for work completion",
      cost: 3, // $3 per verification
      suitableFor: ["piece-rate", "milestone", "volume"],
      features: ["Photo verification", "Quality assessment", "Progress tracking"]
    },
    "weight": {
      name: "Weight Oracle",
      description: "Quantity/weight-based verification",
      cost: 8, // $8 per verification
      suitableFor: ["volume", "piece-rate"],
      features: ["Weight measurement", "Quantity counting", "Volume calculation"]
    },
    "time-clock": {
      name: "Time Clock Oracle",
      description: "Automated time tracking",
      cost: 2, // $2 per verification
      suitableFor: ["time-based"],
      features: ["Clock in/out", "Break tracking", "Overtime calculation"]
    },
    "manual": {
      name: "Manual Verification",
      description: "Human supervisor verification",
      cost: 1, // $1 per verification
      suitableFor: ["all"],
      features: ["Supervisor approval", "Quality control", "Custom verification"]
    }
  };

  // Auto-suggest oracles based on payment type
  const getSuggestedOracles = () => {
    const paymentType = formData.paymentType;
    const suggested = [];
    Object.entries(oracleOptions).forEach(([key, oracle]) => {
      if (oracle.suitableFor.includes("all") || oracle.suitableFor.includes(paymentType)) {
        suggested.push(key);
      }
    });
    return suggested;
  };

  const handleOracleToggle = (oracleKey) => {
    const newSelected = selectedOracles.includes(oracleKey)
      ? selectedOracles.filter(key => key !== oracleKey)
      : [...selectedOracles, oracleKey];
    setSelectedOracles(newSelected);
    // Calculate total cost
    const totalCost = newSelected.reduce((sum, key) => sum + oracleOptions[key].cost, 0);
    setOracleCost(totalCost);
    // Update form data
    handleChange({
      target: {
        name: "selectedOracles",
        value: newSelected
      }
    });
    handleChange({
      target: {
        name: "oracleCost",
        value: totalCost
      }
    });
  };

  const handleAutoSelect = () => {
    const suggested = getSuggestedOracles();
    setSelectedOracles(suggested);
    const totalCost = suggested.reduce((sum, key) => sum + oracleOptions[key].cost, 0);
    setOracleCost(totalCost);
    handleChange({
      target: {
        name: "selectedOracles",
        value: suggested
      }
    });
    handleChange({
      target: {
        name: "oracleCost",
        value: totalCost
      }
    });
  };

  const handleClearSelection = () => {
    setSelectedOracles([]);
    setOracleCost(0);
    handleChange({
      target: {
        name: "selectedOracles",
        value: []
      }
    });
    handleChange({
      target: {
        name: "oracleCost",
        value: 0
      }
    });
  };

  // Initialize with suggested oracles on component mount
  useEffect(() => {
    if (selectedOracles.length === 0) {
      const suggested = getSuggestedOracles();
      if (suggested.length > 0) {
        setSelectedOracles(suggested);
        const totalCost = suggested.reduce((sum, key) => sum + oracleOptions[key].cost, 0);
        setOracleCost(totalCost);
        handleChange({
          target: {
            name: "selectedOracles",
            value: suggested
          }
        });
        handleChange({
          target: {
            name: "oracleCost",
            value: totalCost
          }
        });
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Work Verification Setup</h2>
        <p className="text-gray-600 mb-4">
          Choose how work will be verified and payments will be calculated. 
          Different verification methods have different costs and accuracy levels.
        </p>
      </div>

      {/* Payment Type Summary */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Payment Structure Summary</h3>
        <p className="text-blue-800">
          <strong>Type:</strong> {formData.paymentType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} | 
          <strong> Rate:</strong> {formData.currency} {formData.jobPay} {formData.payFrequency}
        </p>
      </div>

      {/* Auto-selection Controls */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAutoSelect}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Auto-Select Recommended
        </button>
        <button
          type="button"
          onClick={handleClearSelection}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Clear Selection
        </button>
      </div>

      {/* Oracle Selection */}
      <div>
        <label className="block text-lg font-medium mb-3">Verification Methods</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(oracleOptions).map(([key, oracle]) => {
            const isSelected = selectedOracles.includes(key);
            const isRecommended = getSuggestedOracles().includes(key);
            return (
              <div
                key={key}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-300"
                }`}
                onClick={() => handleOracleToggle(key)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{oracle.name}</h4>
                    {isRecommended && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      ${oracle.cost}
                    </div>
                    <div className="text-xs text-gray-500">per verification</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{oracle.description}</p>
                <div className="space-y-1">
                  {oracle.features.map((feature, index) => (
                    <div key={index} className="text-xs text-gray-500 flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleOracleToggle(key)}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium">
                    {isSelected ? "Selected" : "Select"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cost Summary */}
      {selectedOracles.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Verification Cost Summary</h3>
          <div className="space-y-2">
            {selectedOracles.map(key => (
              <div key={key} className="flex justify-between text-sm">
                <span>{oracleOptions[key].name}</span>
                <span>${oracleOptions[key].cost} per verification</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>Total Cost per Verification:</span>
              <span className="text-blue-600">${oracleCost}</span>
            </div>
          </div>
        </div>
      )}

      {/* Verification Frequency */}
      <div>
        <label className="block text-lg font-medium mb-2">Verification Frequency</label>
        <select
          name="verificationFrequency"
          value={formData.verificationFrequency || ""}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="milestone">Per Milestone</option>
          <option value="completion">Upon Completion</option>
          <option value="custom">Custom Schedule</option>
        </select>
      </div>

      {/* Additional Verification Notes */}
      <div>
        <label className="block text-lg font-medium mb-2">Additional Verification Notes</label>
        <textarea
          name="verificationNotes"
          value={formData.verificationNotes || ""}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          placeholder="Any special verification requirements or notes..."
          rows={3}
        />
      </div>
    </div>
  );
} 