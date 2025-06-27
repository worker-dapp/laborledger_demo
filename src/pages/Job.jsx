import React, { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import Step1 from "../Form/Step1";
import Step2 from "../Form/Step2";
import Step3 from "../Form/Step3";
import Step4 from "../Form/Step4";
import Step5 from "../Form/Step5";

export default function Job() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
    jobTitle: "",
    jobLocationType: "",
    jobLocation: "",
    companyName: "",
    notifications: "",
    referenceCode: "",
    JObType: "",
    jobPay: "",
    additionalCompensation: "",
    employeeBenefits: "",
    summary: "",
    responsiblities: "",
    skills: "",
    companyDescription: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted at step:", step);
    alert("Form submitted");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} handleChange={handleChange} />;
      case 2:
        return <Step2 formData={formData} handleChange={handleChange} />;
      case 3:
        return <Step3 formData={formData} handleChange={handleChange} />;
      case 4:
        return <Step4 formData={formData} handleChange={handleChange} />;
      case 5:
        return <Step5 formData={formData} handleChange={handleChange} />;
      default:
        return <div>Step {step}</div>;
    }
  };

  return (
    <div className="w-2/3 mx-auto m-10 p-10 bg-white rounded shadow-md">
      <StepIndicator
        currentStep={step}
        onStepClick={setStep}
        totalSteps={totalSteps}
      />

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Back
            </button>
          )}
          {step < totalSteps ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
