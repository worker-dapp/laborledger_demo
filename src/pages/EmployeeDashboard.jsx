import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const EmployeeDashboard = () => {
  // Sample array of jobs
  const jobs = [
    {
      id: 1,
      name: "Software Engineer",
      description: "Develop and maintain software applications.",
      schedule: "Mon-Fri, 9:00 AM - 5:00 PM",
      location: "Remote",
      salary: "$90,000 per year",
    },
    {
      id: 2,
      name: "Data Scientist",
      description: "Analyze and interpret complex data to provide insights.",
      schedule: "Mon-Fri, 9:00 AM - 5:00 PM",
      location: "On-site",
      salary: "$100,000 per year",
    },
    {
      id: 3,
      name: "Product Manager",
      description:
        "Manage product lifecycle and ensure successful product launches.",
      schedule: "Mon-Fri, 9:00 AM - 6:00 PM",
      location: "Hybrid",
      salary: "$110,000 per year",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9E5] pb-20">
      <Navbar />
      <div>
        <div className="relative ">
          <div className="text-4xl font-bold text-[#0D3B66] text-center p-12">
            Welcome!!
          </div>
          <Link
            to="/my-jobs"
            className="absolute right-20 top-12 text-xl text-[#EE964B] font-semibold hover:underline">
            My Jobs
          </Link>
        </div>

        {/* Job List Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full px-6 lg:px-36">
          {/* Map over the jobs and render each one as a card */}
          {jobs.map((job) => (
            <Link
              key={job.id}
              to={`/job-details/${job.id}`}
              className="bg-white p-8 rounded-2xl border border-[#F4D35E] shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-[#0D3B66] mb-2">
                {job.name}
              </h3>
              <p className="text-md text-[#0D3B66] mb-1">
                <strong>Description:</strong> {job.description}
              </p>
              <p className="text-md text-[#0D3B66] mb-1">
                <strong>Schedule:</strong> {job.schedule}
              </p>
              <p className="text-md text-[#0D3B66] mb-1">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-md text-[#0D3B66] mb-1">
                <strong>Salary:</strong> {job.salary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
