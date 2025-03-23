import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const JobDetails = () => {
  // Sample array of jobs (same as in EmployeeDashboard)
  const [accpeted, setAccepted] = useState("Accept");
  const navigtate = useNavigate();

  useEffect(() => {
    const fetchContract = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("id", id)
        .single();

  // Find the job by its ID
  const job = jobs.find((job) => job.id === parseInt(jobId));

  if (!job) {
    return <div>Job not found!</div>;
  }

  const handleAccept = () => {
    setAccepted("Accepted");
    setTimeout(() => {
      navigtate("/my-jobs");
    }, 1000);
  };

  return (
    <div className="min-h-screen  bg-[#FFFFFF]">
      <Navbar />
      <div className="w-1/2 mx-auto pt-20">
        <h2 className="text-4xl font-extrabold text-[#0D3B66] mb-6">
          {job.name} - Detailed Information
        </h2>

        <p className="text-lg text-[#0D3B66] mb-3">
          <strong>Description:</strong> {job.description}
        </p>
        <p className="text-lg text-[#0D3B66] mb-3">
          <strong>Schedule:</strong> {job.schedule}
        </p>
        <p className="text-lg text-[#0D3B66] mb-3">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="text-lg text-[#0D3B66] mb-3">
          <strong>Salary:</strong> {job.salary}
        </p>
        <p className="text-lg text-[#0D3B66] mb-3">
          <strong>Requirements:</strong> {job.requirements}
        </p>
        <p className="text-lg text-[#0D3B66] mb-3">
          <strong>Benefits:</strong> {job.benefits}
        </p>
        <div
          className="bg-[#EE964B] cursor-pointer text-white px-6 py-2 rounded-lg transition-all shadow-md text-lg text-center mt-6 w-1/3"
          onClick={handleAccept}>
          {accpeted}
      </div>
      
    </div>
  );
};

export default JobDetails;
