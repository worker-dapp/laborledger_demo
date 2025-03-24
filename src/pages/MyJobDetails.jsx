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
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(null);

  const handlePunch = () => {
    if (!locationFetched && !loading) {
      fetchLocation();
      setLocationFetched(true);
    }

    if (location.latitude && location.longitude) {
      const currentTime = new Date().toLocaleTimeString();

      if (!isPunchedIn) {
        // Punch in
        setPunchInDetails((prev) => [
          ...prev,
          {
            latitude: location.latitude,
            longitude: location.longitude,
            locationName: location.name,
            punchIn: currentTime,
            punchOut: null,
          },
        ]);
      } else {
        // Punch out
        setPunchInDetails((prev) =>
          prev.map((entry, idx) =>
            idx === prev.length - 1 && !entry.punchOut
              ? { ...entry, punchOut: currentTime }
              : entry
          )
        );
      }

      setIsPunchedIn(!isPunchedIn);
    }
  };

  const handleSubmit = () => {
    setShowModal(true);
    const randomAmount = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    setPaymentAmount(randomAmount);
  };

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
    <div className="min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF] pb-20">
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
          onClick={handlePunch}
          className={`${
            isPunchedIn
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white font-bold py-2 px-8 rounded-xl transition`}
          disabled={loading}
        >
          {loading
            ? "Fetching..."
            : isPunchedIn
            ? "Punch Out"
            : "Punch In"}
        </button>


          <button
            onClick={handlePunch}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-8 rounded-xl transition"
            disabled={loading}
          >
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
                <th className="border px-4 py-2">Punch In</th>
                <th className="border px-4 py-2">Punch Out</th>
                <th className="border px-4 py-2">Submit</th>
              </tr>
            </thead>
            <tbody>
              {punchInDetails.length > 0 ? (
                punchInDetails.map((detail, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{detail.latitude}</td>
                    <td className="border px-4 py-2">{detail.longitude}</td>
                    <td className="border px-4 py-2">{detail.locationName}</td>
                    <td className="border px-4 py-2">{detail.punchIn}</td>
                    <td className="border px-4 py-2">
                      {detail.punchOut || "-"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                        disabled={!detail.punchIn || !detail.punchOut}
                      >
                        Submit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border px-4 py-2 text-center">
                    No Punch-In Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-10 w-[90%] max-w-md text-center">
              <h2 className="text-2xl font-bold mb-4">Validating GPS...</h2>
              <p className="text-lg mb-6">
                Your punches are validated and you will be paid{" "}
                <span className="font-semibold text-green-600">
                  ${paymentAmount}
                </span>
                .<br />
                Check your wallet in about 5–10 mins.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobDetails;
