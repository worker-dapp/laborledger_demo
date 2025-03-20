import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import supabase from "../supabaseClient";

const EmployerJobPortal = () => {
  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Modals
  const [openPostJobModal, setOpenPostJobModal] = useState(false);
  const [openApplicantsModal, setOpenApplicantsModal] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState([]);

  // New Job form
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    type: "",
    schedule: "",
    manager: "",
    location: "",
    salary: "",
    applicants: [],
  });

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [jobTypeFilters, setJobTypeFilters] = useState({
    fullTime: false,
    partTime: false,
    contract: false,
  });

  // --------------------------------------------------------------------------
  // INITIAL FETCH
  // --------------------------------------------------------------------------
  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase.from("jobs").select("*");
      if (error) {
        console.error("Error fetching jobs:", error);
      } else {
        setJobs(data || []);
        setFilteredJobs(data || []);
      }
    };
    fetchJobs();
  }, []);

  // --------------------------------------------------------------------------
  // FILTERING LOGIC
  // --------------------------------------------------------------------------
  useEffect(() => {
    filterJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTitle, jobTypeFilters, jobs]);

  const filterJobs = () => {
    let updated = [...jobs];

    // 1. Filter by job title
    if (searchTitle.trim() !== "") {
      updated = updated.filter((job) =>
        job.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    // 2. Filter by job type
    const { fullTime, partTime, contract } = jobTypeFilters;
    const anyTypeSelected = fullTime || partTime || contract;
    if (anyTypeSelected) {
      updated = updated.filter((job) => {
        const jobType = job.type?.toLowerCase();
        if (fullTime && jobType === "full-time") return true;
        if (partTime && jobType === "part-time") return true;
        if (contract && jobType === "contract") return true;
        return false;
      });
    }

    setFilteredJobs(updated);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setJobTypeFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // --------------------------------------------------------------------------
  // JOB APPLICANTS
  // --------------------------------------------------------------------------
  const handleViewApplicants = (applicants) => {
    setSelectedApplicants(applicants);
    setOpenApplicantsModal(true);
  };

  // --------------------------------------------------------------------------
  // POSTING A NEW JOB
  // --------------------------------------------------------------------------
  const handlePostJob = async () => {
    const { title, description, type, schedule, manager, location, salary } = newJob;

    if (!title || !description || !type || !schedule || !manager || !location || !salary) {
      alert("All fields are required!");
      return;
    }

    const { data, error } = await supabase.from("jobs").insert([newJob]).select();
    if (error) {
      console.error("Error posting job:", error);
    } else if (data) {
      // Update local state
      setJobs([...jobs, data[0]]);
      // Close modal & reset form
      setOpenPostJobModal(false);
      setNewJob({
        title: "",
        description: "",
        type: "",
        schedule: "",
        manager: "",
        location: "",
        salary: "",
        applicants: [],
      });
    }
  };

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return (
    <div className="relative min-h-screen p-6 bg-gray-100">
      {/* TOP BAR */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-600">Job Dashboard</h1>
        <button
          className="bg-orange-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-600"
          onClick={() => setOpenPostJobModal(true)}
        >
          Post a New Job
        </button>
      </div>

      {/* JOB LISTINGS (FILTERED) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500"
          >
            <h2 className="text-lg font-bold text-orange-600 mb-2">{job.title}</h2>
            <p className="text-gray-700 mb-1">
              <strong>Description:</strong> {job.description}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Type:</strong> {job.type}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Schedule:</strong> {job.schedule}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Manager:</strong> {job.manager}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Salary:</strong> {job.salary}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Applicants:</strong> {job.applicants?.length || 0}
            </p>
            <button
              className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-orange-600"
              onClick={() => handleViewApplicants(job.applicants)}
            >
              View Applicants
            </button>
            <button className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-orange-600">
            <Link 
              to="/new-job" 
              // state={{ jobData: job }} 
            >
              Create New Contract
            </Link>

            </button>
          </div>
        ))}
      </div>

      {/* FILTER BUTTON IN UPPER LEFT CORNER */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        // Position near top-left. Adjust `top`/`left` as needed.
        className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white shadow-md border 
                   flex items-center justify-center text-orange-500 hover:bg-orange-50"
      >
        {/* Icon (funnel/hamburger) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2}
            d="M3 4h18M8 12h8m-6 8h4" 
          />
        </svg>
      </button>

      {/* FILTER PANEL (NOT COVERING THE WHOLE PAGE) */}
      {showFilters && (
        <div
          className="absolute top-20 left-6 w-64 bg-white p-4 rounded shadow-md border 
                     transition-all"
          style={{ zIndex: 9999 }} // Make sure it's above other elements
        >
          <h2 className="text-xl font-bold mb-4">Filters</h2>

          {/* Search by Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="searchTitle">
              Search Job Title
            </label>
            <input
              id="searchTitle"
              type="text"
              placeholder="e.g. Developer"
              className="w-full p-2 border rounded"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>

          {/* Job Type Checkboxes */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Job Type</h3>
            <label className="flex items-center mb-1">
              <input
                type="checkbox"
                name="fullTime"
                checked={jobTypeFilters.fullTime}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Full-time
            </label>
            <label className="flex items-center mb-1">
              <input
                type="checkbox"
                name="partTime"
                checked={jobTypeFilters.partTime}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Part-time
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="contract"
                checked={jobTypeFilters.contract}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Contract
            </label>
          </div>

          <button
            className="mt-2 w-full bg-orange-500 text-white py-2 rounded shadow hover:bg-orange-600"
            onClick={() => setShowFilters(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* POST JOB MODAL */}
      {openPostJobModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-orange-600 mb-4">Post a New Job</h2>
            <input
              type="text"
              placeholder="Job Title"
              className="w-full p-2 border rounded mb-2"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full p-2 border rounded mb-2"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Type (Full-time, Part-time, Contract, etc.)"
              className="w-full p-2 border rounded mb-2"
              value={newJob.type}
              onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
            />
            <input
              type="text"
              placeholder="Schedule"
              className="w-full p-2 border rounded mb-2"
              value={newJob.schedule}
              onChange={(e) => setNewJob({ ...newJob, schedule: e.target.value })}
            />
            <input
              type="text"
              placeholder="Manager"
              className="w-full p-2 border rounded mb-2"
              value={newJob.manager}
              onChange={(e) => setNewJob({ ...newJob, manager: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full p-2 border rounded mb-2"
              value={newJob.location}
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            />
            <input
              type="text"
              placeholder="Salary"
              className="w-full p-2 border rounded mb-2"
              value={newJob.salary}
              onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
            />
            <button
              className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-orange-600"
              onClick={handlePostJob}
            >
              Post Job
            </button>
            <button
              className="mt-2 w-full bg-gray-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-600"
              onClick={() => setOpenPostJobModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* VIEW APPLICANTS MODAL */}
      {openApplicantsModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-orange-600 mb-4">Applicants</h2>
            {selectedApplicants && selectedApplicants.length > 0 ? (
              <ul className="list-disc ml-5">
                {selectedApplicants.map((applicant, index) => (
                  <li key={index} className="mb-2">
                    {/* Customize how you display applicant data here */}
                    {applicant.name} - {applicant.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applicants yet.</p>
            )}
            <button
              className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-600"
              onClick={() => setOpenApplicantsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerJobPortal;
