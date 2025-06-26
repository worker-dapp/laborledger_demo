export default function Step3({ formData, handleChange }) {
  return (
    <div>
      <label className="block mb-2">
        Address:
        <input
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        City:
        <input
          name="city"
          value={formData.city || ""}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>
    </div>
  );
}
