export default function Step2({ formData, handleChange }) {
  return (
    <div>
      <label className="block mb-2">
        Password:
        <input
          type="password"
          name="password"
          value={formData.password || ""}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </label>
    </div>
  );
}
