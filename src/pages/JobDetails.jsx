import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'

const JobDetails = () => {
  // Sample array of jobs (same as in EmployeeDashboard)
  const [accpeted, setAccepted] = useState("Accept")
  const navigtate = useNavigate()
  const jobs = [
    {
      id: 1,
      name: 'Software Engineer',
      description: 'Develop and maintain software applications.',
      schedule: 'Mon-Fri, 9:00 AM - 5:00 PM',
      location: 'Remote',
      salary: '$90,000 per year',
      requirements: '3+ years of experience in software development, React, Node.js.',
      benefits: 'Health insurance, 401(k), flexible working hours, remote work option.'
    },
    {
      id: 2,
      name: 'Data Scientist',
      description: 'Analyze and interpret complex data to provide insights.',
      schedule: 'Mon-Fri, 9:00 AM - 5:00 PM',
      location: 'On-site',
      salary: '$100,000 per year',
      requirements: 'Proficiency in Python, R, SQL, and data visualization tools.',
      benefits: 'Health insurance, paid time off, flexible work hours.'
    },
    {
      id: 3,
      name: 'Product Manager',
      description: 'Manage product lifecycle and ensure successful product launches.',
      schedule: 'Mon-Fri, 9:00 AM - 6:00 PM',
      location: 'Hybrid',
      salary: '$110,000 per year',
      requirements: 'Experience in product management, Agile methodology, leadership skills.',
      benefits: 'Health insurance, performance bonuses, 401(k).'
    }
  ];

  // Get the job ID from the URL
  const { jobId } = useParams();

  // Find the job by its ID
  const job = jobs.find(job => job.id === parseInt(jobId));

  if (!job) {
    return <div>Job not found!</div>
  }

  const handleAccept = () => {
    setAccepted("Accepted")
    setTimeout(() => {
      navigtate('/my-jobs')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6]">
      <Navbar />
      <div className="w-1/2 mx-auto pt-20">
        <h2 className="text-3xl font-bold mb-4">{job.name} - Detailed Information</h2>
        
        <p className="text-lg mb-2"><strong>Description:</strong> {job.description}</p>
        <p className="text-lg mb-2"><strong>Schedule:</strong> {job.schedule}</p>
        <p className="text-lg mb-2"><strong>Location:</strong> {job.location}</p>
        <p className="text-lg mb-2"><strong>Salary:</strong> {job.salary}</p>
        <p className="text-lg mb-2"><strong>Requirements:</strong> {job.requirements}</p>
        <p className="text-lg mb-2"><strong>Benefits:</strong> {job.benefits}</p>
        <div className='bg-orange-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all shadow-md text-lg text-center mt-6 w-1/3'
            onClick={handleAccept}>
          {accpeted}
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
