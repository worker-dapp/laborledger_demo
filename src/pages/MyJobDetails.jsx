import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import GetLocation from "../components/GetLocation";

const jobs = [
  {
    id: 1,
    name: "Software Engineer",
    description: "Develop and maintain software applications.",
  },
  {
    id: 2,
    name: "Data Scientist",
    description: "Analyze and interpret complex data to provide insights.",
  },
];

const MyJobDetails = () => {
  const { jobId } = useParams();
  const job = jobs.find((job) => job.id === parseInt(jobId));

  const { fetchLocation, location, loading, error } = GetLocation();
  const [punchInDetails, setPunchInDetails] = useState([]);
  const [locationFetched, setLocationFetched] = useState(false);

  const handlePunchIn = () => {
    if (!locationFetched && !loading) {
      fetchLocation();
      setLocationFetched(true);
    }

    if (location.latitude && location.longitude) {
      const punchInTime = new Date().toLocaleTimeString();
      setPunchInDetails((prevState) => [
        ...prevState,
        {
          latitude: location.latitude,
          longitude: location.longitude,
          locationName: location.name,
          time: punchInTime,
        },
      ]);
    }
  };

  useEffect(() => {
    if (location && location.latitude && location.longitude) {
      if (punchInDetails.length === 0) {
        // Ensure we add punch-in only when location is available
        const punchInTime = new Date().toLocaleTimeString();
        setPunchInDetails((prevState) => [
          ...prevState,
          {
            latitude: location.latitude,
            longitude: location.longitude,
            locationName: location.name,
            time: punchInTime,
          },
        ]);
      }
    }
  }, [location, punchInDetails]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] pb-20">
      <Navbar />
      <div className="text-3xl text-[#0D3B66] text-center p-12">
        {job?.name} Details
      </div>

      <div className="w-2/3 mx-auto p-10">
        <h3 className="text-xl font-semibold mb-4">{job?.name}</h3>
        <p className="text-lg mb-4">
          <strong>Description:</strong> {job?.description}
        </p>

        <button
          onClick={handlePunchIn}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl transition"
          disabled={loading}>
          {loading ? "Fetching..." : "Punch In"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-8 text-gray-700">
          <h4 className="font-semibold mb-4">Punch-in Details</h4>

          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Latitude</th>
                <th className="border px-4 py-2">Longitude</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {punchInDetails.length > 0 ? (
                punchInDetails.map((detail, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{detail.latitude}</td>
                    <td className="border px-4 py-2">{detail.longitude}</td>
                    <td className="border px-4 py-2">{detail.locationName}</td>
                    <td className="border px-4 py-2">{detail.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 py-2 text-center">
                    No Punch-In Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyJobDetails;
