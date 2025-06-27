import React from "react";

export default function ContractFactory({ formData }) {
  const {
    companyName,
    jobTitle,
    jobLocationType,
    jobLocation,
    JObType,
    jobPay,
    currency,
    payFrequency,
    additionalCompensation,
    employeeBenefits,
  } = formData;

  // Parse additionalCompensation and employeeBenefits if stored as comma-separated strings
  const additionalCompList = additionalCompensation
    ? additionalCompensation.split(",").filter(Boolean)
    : [];
  const employeeBenefitsList = employeeBenefits
    ? employeeBenefits.split(",").filter(Boolean)
    : [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Review and Finalize Contract</h2>

      <section>
        <h3 className="font-semibold mb-2">Basic Job Information</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>
            <strong>Company Name:</strong> {companyName || "Not provided"}
          </li>
          <li>
            <strong>Job Title:</strong> {jobTitle || "Not provided"}
          </li>
          <li>
            <strong>Job will be performed:</strong>{" "}
            {jobLocationType === "on site" || jobLocationType === "on the road"
              ? jobLocationType
              : "Not specified"}
          </li>
          <li>
            <strong>Job Location:</strong> {jobLocation || "Not provided"}
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Pay</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>
            <strong>Job Type:</strong> {JObType || "Not provided"}
          </li>
          <li>
            <strong>Pay:</strong>{" "}
            {jobPay && currency && payFrequency
              ? `${currency} ${jobPay} per ${payFrequency}`
              : "Not provided"}
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Additional Compensation</h3>
        {additionalCompList.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {additionalCompList.map((comp) => (
              <li key={comp}>{comp}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">None</p>
        )}
      </section>

      <section>
        <h3 className="font-semibold mb-2">Employee Benefits</h3>
        {employeeBenefitsList.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {employeeBenefitsList.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">None</p>
        )}
      </section>
    </div>
  );
}
