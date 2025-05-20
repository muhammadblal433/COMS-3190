import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ApplyJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    emailAddress: "",
    jobId: "",
    jobTitle: "",
    department: "",
    coverLetterLink: "",
    resumeLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    // Auto-generate Job ID if jobTitle and department are selected
    if (name === "jobTitle" || name === "department") {
      const { jobTitle, department } = updatedFormData;
      if (jobTitle && department) {
        const deptCode = department.split(" ")[0].toUpperCase().slice(0, 3); // like "COM" for "Computer Science"
        const titleCode = jobTitle.split(" ")[0].toUpperCase().slice(0, 3); // like "TEA" for "Teaching Professor"
        const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
        updatedFormData.jobId = `${deptCode}${titleCode}${randomNumber}`;
      }
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];
    const randomApplicationId = `ISU-${Math.floor(
      10000 + Math.random() * 90000
    )}`;

    const payload = {
      applicationId: randomApplicationId,
      first_name: formData.first_name,
      last_name: formData.last_name,
      emailAddress: formData.emailAddress,
      jobId: formData.jobId,
      jobTitle: formData.jobTitle,
      department: formData.department,
      coverLetterLink: formData.coverLetterLink,
      resumeLink: formData.resumeLink,
      status: "pending",
      jobPostingDate: today,
      appliedOn: today,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/jobApplications",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("✅ Job Application Submitted Successfully!");
        navigate("/");
      } else {
        alert("❌ Error submitting job application.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error submitting job application.");
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Apply for a Job</h1>

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
            Job ID (Auto-Generated)
          </label>
          <input
            type="text"
            name="jobId"
            value={formData.jobId}
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            readOnly
            required
          />
        </div>

        {/* Row 3 - Job Title */}
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

        {/* Row 3 - Department */}
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

        {/* Row 4 - Links */}
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
            placeholder="http://yourcoverletter.com"
            required
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
            placeholder="http://yourresume.com"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-800 hover:bg-[#FFD700] hover:text-black text-white font-semibold py-3 rounded transition duration-200"
          >
            Submit Job Application
          </button>
        </div>
      </form>
    </div>
  );
}
