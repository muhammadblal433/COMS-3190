import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ApplyLeave() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: "",
    first_name: "",
    last_name: "",
    emailAddress: "",
    jobTitle: "",
    leaveType: "",
    numberOfDays: "",
    leaveDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];
    const randomLeaveId = Math.floor(1000 + Math.random() * 9000);

    const payload = {
      leaveId: randomLeaveId,
      employeeId: formData.employeeId,
      first_name: formData.first_name,
      last_name: formData.last_name,
      emailAddress: formData.emailAddress,
      jobTitle: formData.jobTitle || "",
      leaveType: formData.leaveType,
      numberOfDays: parseInt(formData.numberOfDays) || 0,
      leaveDate: formData.leaveDate,
      status: "pending",
      appliedOn: today,
      totalUsedLeaves: parseInt(formData.numberOfDays) || 0,
    };

    try {
      const response = await fetch("http://localhost:8080/api/leaveRequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("✅ Leave Application Submitted Successfully!");
        navigate("/");
      } else {
        alert("❌ Error submitting leave application.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error submitting leave application.");
    }
  };

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6">
      <div className="flex items-center mb-6">
        <button
          onClick={handleBackToHome}
          className="flex items-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          <span className="mr-2 text-xl">←</span> Back
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Apply for Leave</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Row 1 */}
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

        {/* Row 2 */}
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
            Employee ID
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Row 3 */}
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
            <option value="">Select Leave Type</option>
            <option value="Vacation">Vacation</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Personal Leave">Personal Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
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

        {/* Row 4 */}
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

        {/* Row 5 Full width */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-1">
            Job Title (Optional)
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Enter your job title if needed"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Submit button full width */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-800 hover:bg-[#FFD700] text-white hover:text-black font-semibold py-3 rounded transition duration-200"
          >
            Submit Leave Application
          </button>
        </div>
      </form>
    </div>
  );
}
