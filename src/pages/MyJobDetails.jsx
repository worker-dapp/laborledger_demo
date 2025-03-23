import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import GetLocation from "../components/GetLocation";
import supabase from "../supabaseClient";

const MyJobDetails = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);

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

  useEffect(() => {
    const fetchContract = async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching contract:", error);
      } else {
        setContract(data);
      }
    };

    fetchContract();
  }, [id]);

  if (!contract) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex justify-center items-center">
        <h2 className="text-2xl text-[#EE964B]">Contract not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F2] to-[#FFE8D6] pb-20">
      <Navbar />
      <div className="text-4xl text-orange-600 font-bold text-center p-12">
        {contract.contracttitle} Details
      </div>

      <div className="w-2/3 mx-auto p-10">
        <p className="text-lg">
          <strong>Description:</strong>
        </p>
        <p className="text-lg">
          <strong>Payment Rate :</strong> {contract.paymentrate}
        </p>
        <p className="text-lg">
          <strong>Payment Frequency :</strong> {contract.paymentfrequency}
        </p>
        <p className="text-lg pb-5">
          <strong>Location :</strong> {contract.location}
        </p>

        <div className="flex justify-between">
          <button
            onClick={handlePunchIn}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-xl transition"
            disabled={loading}>
            {loading ? "Fetching..." : "Punch In"}
          </button>
          <button
            onClick={handlePunchIn}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-xl transition"
            disabled={loading}>
            Raise a dispute
          </button>
        </div>

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
