import React from "react";

export default function JobDetails({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      {/* Job Summary */}
      <div>
        <label className="block text-lg font-medium mb-2">
          Job Summary
        </label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          placeholder="Provide a brief overview of the job..."
          rows={4}
        />
      </div>

      {/* Job Location Type */}
      <div>
        <label className="block text-lg font-medium mb-2">Job Location Type</label>
        <div className="flex flex-wrap gap-2">
          {["Remote", "On-site", "Hybrid"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                handleChange({ target: { name: "jobLocationType", value: type } })
              }
              className={`px-4 py-2 rounded border ${
                formData.jobLocationType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Job Location */}
      <div>
        <label className="block text-lg font-medium mb-2">
          Job Location
        </label>
        <input
          type="text"
          name="jobLocation"
          value={formData.jobLocation}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Enter job location (city, state, country)"
        />
      </div>

      {/* Company Description */}
      <div>
        <label className="block text-lg font-medium mb-2">
          Company Description
        </label>
        <textarea
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          placeholder="Tell us about your company..."
          rows={4}
        />
      </div>

      {/* Reference Code */}
      <div>
        <label className="block text-lg font-medium mb-2">
          Reference Code (Optional)
        </label>
        <input
          type="text"
          name="referenceCode"
          value={formData.referenceCode}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Enter reference code if applicable"
        />
      </div>

      {/* Notifications */}
      <div>
        <label className="block text-lg font-medium mb-2">
          Notification Preferences
        </label>
        <select
          name="notifications"
          value={formData.notifications}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select notification preference</option>
          <option value="email">Email notifications</option>
          <option value="sms">SMS notifications</option>
          <option value="both">Both email and SMS</option>
          <option value="none">No notifications</option>
        </select>
      </div>
    </div>
  );
} 