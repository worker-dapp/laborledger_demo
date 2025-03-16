import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import Navbar from '../components/Navbar';

const jobs = [
    {
        id: 1,
        name: 'Software Engineer',
        description: 'Develop and maintain software applications.',
    },
    {
        id: 2,
        name: 'Data Scientist',
        description: 'Analyze and interpret complex data to provide insights.',
    },
];

const MyJobs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6] pb-20">
            <Navbar />
            <div className="text-3xl text-center p-12">Current Jobs</div>

            {/* Job List Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full px-6 lg:px-36">
                {jobs.map((job) => (
                    <Link 
                    to={`/my-jobs/${job.id}`} 
                        key={job.id} 
                        className="bg-white p-10 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                        <h3 className="text-xl font-semibold mb-2">{job.name}</h3>
                        <p className="text-lg mb-2"><strong>Description:</strong> {job.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MyJobs;
