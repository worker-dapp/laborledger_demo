import React from "react";

export default function Step3({ formData }) {
  return (
    <div className="space-y-6">
      {/* Instructional Text */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p className="text-md font-medium text-yellow-800">
          Make sure your job ad gets the job done.
        </p>
        <p className="text-sm text-yellow-700 mt-1">
          Enter your description into each section for best results.
          The more complete the job ad, the better your responses.
        </p>
      </div>

      {/* Summary Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            Job Title
          </label>
          <div className="border p-3 rounded bg-gray-50">
            {formData.jobTitle || <span className="text-gray-400">Not entered</span>}
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            Company Name
          </label>
          <div className="border p-3 rounded bg-gray-50">
            {formData.companyName || <span className="text-gray-400">Not entered</span>}
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            Rate of Pay
          </label>
          <div className="border p-3 rounded bg-gray-50">
            {formData.jobPay
              ? `${formData.currency || ''} ${formData.jobPay} ${formData.payFrequency || ''}`
              : <span className="text-gray-400">Not entered</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
