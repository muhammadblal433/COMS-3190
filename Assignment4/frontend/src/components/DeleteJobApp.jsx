import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteJobApplication() {
  const navigate = useNavigate();
  const [applicationId, setApplicationId] = useState("");

  const handleDelete = async () => {
    if (!applicationId) {
      alert("Please enter an Application ID.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/jobApplications/${applicationId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("✅ Job Application Deleted Successfully!");
        navigate("/");
      } else {
        alert("❌ Failed to delete Job Application.");
      }
    } catch (error) {
      console.error("Error deleting job application:", error);
      alert("❌ Error deleting job application.");
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Delete Job Application
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-gray-700 font-semibold mb-2">
          Enter Application ID to Delete
        </label>
        <input
          type="text"
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter Application ID (example: ISU-12345)"
          required
        />
        <button
          onClick={handleDelete}
          className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Delete Job Application
        </button>
      </div>
    </div>
  );
}
