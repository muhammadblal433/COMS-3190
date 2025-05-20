import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ModifyJobApplication({ existingData = {} }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    applicationId: existingData.applicationId || "",
    first_name: existingData.first_name || "",
    last_name: existingData.last_name || "",
    emailAddress: existingData.emailAddress || "",
    jobId: existingData.jobId || "",
    jobTitle: existingData.jobTitle || "",
    department: existingData.department || "",
    coverLetterLink: existingData.coverLetterLink || "",
    resumeLink: existingData.resumeLink || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/jobApplications/${formData.applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("✅ Job Application Updated Successfully!");
        navigate("/");
      } else {
        alert("❌ Failed to update Job Application.");
      }
    } catch (error) {
      console.error("Error updating job application:", error);
      alert("❌ Error updating job application.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Modify Job Application
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Application ID */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-1">
            Application ID
          </label>
          <input
            type="text"
            name="applicationId"
            value={formData.applicationId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* First Name / Last Name */}
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

        {/* Email */}
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

        {/* Job ID */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Job ID
          </label>
          <input
            type="text"
            name="jobId"
            value={formData.jobId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Job Title
          </label>
          <select
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Job Title</option>
            <option value="Teaching Professor">Teaching Professor</option>
            <option value="Research Assistant">Research Assistant</option>
            <option value="Administrative Assistant">
              Administrative Assistant
            </option>
            <option value="Librarian">Librarian</option>
            <option value="Custodian">Custodian</option>
            <option value="IT Specialist">IT Specialist</option>
          </select>
        </div>

        {/* Department */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Department</option>
            <option value="Mathematics Department">
              Mathematics Department
            </option>
            <option value="Computer Science Department">
              Computer Science Department
            </option>
            <option value="Biology Department">Biology Department</option>
            <option value="Chemistry Department">Chemistry Department</option>
            <option value="Physics Department">Physics Department</option>
          </select>
        </div>

        {/* Cover Letter / Resume Links */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Cover Letter Link
          </label>
          <input
            type="url"
            name="coverLetterLink"
            value={formData.coverLetterLink}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            placeholder="https://example.com/coverletter"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Resume Link
          </label>
          <input
            type="url"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            placeholder="https://example.com/resume"
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
