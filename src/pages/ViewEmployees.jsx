import React, { useState } from 'react'
import Navbar from '../components/Navbar';

export const employees = [
    { id: 1, name: "John Doe", position: "Software Engineer" },
    { id: 2, name: "Jane Smith", position: "Product Manager" },
    { id: 3, name: "Alice Johnson", position: "UX Designer" },
    { id: 4, name: "Bob Brown", position: "DevOps Engineer" },
];

const ViewEmployees = () => {

    const [search, setSearch] = useState("");

    const filteredEmployees = employees.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6]">
        <Navbar />
        <div className='w-1/2 mx-auto pt-10'>
            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-5 text-xl mb-4 rounded-2xl shadow-2xl border border-gray-100 bg-white/80 backdrop-blur-lg"
            />
            <div className="space-y-4">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="p-5 cursor-pointer rounded-2xl shadow-2xl border border-gray-100 bg-white/80 backdrop-blur-lg">
                  <h3 className="text-2xl font-semibold">{employee.name}</h3>
                  <p className="text-gray-600 text-lg">{employee.position}</p>
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default ViewEmployees