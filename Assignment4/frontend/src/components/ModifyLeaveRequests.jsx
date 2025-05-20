import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ModifyLeaveRequest({ existingData = {} }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    leaveId: existingData.leaveId || "",
    first_name: existingData.first_name || "",
    last_name: existingData.last_name || "",
    emailAddress: existingData.emailAddress || "",
    leaveType: existingData.leaveType || "",
    numberOfDays: existingData.numberOfDays || "",
    leaveDate: existingData.leaveDate || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/leaveRequests/${formData.leaveId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("✅ Leave Request Updated Successfully!");
        navigate("/");
      } else {
        alert("❌ Failed to update Leave Request.");
      }
    } catch (error) {
      console.error("Error updating leave request:", error);
      alert("❌ Error updating leave request.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Modify Leave Request
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Leave ID Input */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-1">
            Leave ID
          </label>
          <input
            type="text"
            name="leaveId"
            value={formData.leaveId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Fields */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Leave Type
          </label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Vacation Leave">Vacation Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Number of Days
          </label>
          <input
            type="number"
            name="numberOfDays"
            value={formData.numberOfDays}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Leave Date
          </label>
          <input
            type="date"
            name="leaveDate"
            value={formData.leaveDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Save / Cancel Buttons */}
        <div className="col-span-1 md:col-span-2 flex space-x-4 mt-4">
          <button
            type="submit"
            className="w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
