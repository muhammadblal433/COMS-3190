import React, { useEffect, useState } from "react";

export default function PendingJobApplications() {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPendingApplications() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/jobApplications"
        );
        const data = await response.json();
        const pending = data.filter(
          (application) => application.status?.toLowerCase() === "pending"
        );
        setPendingApplications(pending);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pending job applications:", error);
        setLoading(false);
      }
    }

    fetchPendingApplications();
  }, []);

  const handleApprove = (id) => {
    setPendingApplications((prevApplications) =>
      prevApplications.map((application) =>
        application._id === id
          ? { ...application, status: "finalist" }
          : application
      )
    );
  };

  const handleReject = (id) => {
    setPendingApplications((prevApplications) =>
      prevApplications.map((application) =>
        application._id === id
          ? { ...application, status: "rejected" }
          : application
      )
    );
  };

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6 mb-10">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleBackToHome}
          className="flex items-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          <span className="mr-2 text-xl">←</span> Back
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Pending Job Applications
      </h1>

      {loading ? (
        <p className="text-gray-700">Loading pending applications...</p>
      ) : pendingApplications.length === 0 ? (
        <p className="text-gray-700">
          No pending job applications at the moment!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingApplications.map((application) => (
            <div
              key={application._id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {application.first_name} {application.last_name}
                </h2>
                <p className="text-gray-600">
                  <strong>Email:</strong> {application.emailAddress}
                </p>
                <p className="text-gray-600">
                  <strong>Application ID:</strong> {application.applicationId}
                </p>
                <p className="text-gray-600">
                  <strong>Job Req ID:</strong> {application.jobId}
                </p>
                <p className="text-gray-600">
                  <strong>Job Title:</strong> {application.jobTitle}
                </p>
                <p className="text-gray-600">
                  <strong>Department:</strong> {application.department}
                </p>
                <p className="text-gray-600">
                  <strong>Cover Letter:</strong>{" "}
                  <a
                    href={application.coverLetterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </p>
                <p className="text-gray-600">
                  <strong>Resume:</strong>{" "}
                  <a
                    href={application.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </p>
                <p className="text-gray-600">
                  <strong>Applied On:</strong> {application.appliedOn}
                </p>
                <p className="text-gray-600">
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      application.status === "finalist"
                        ? "text-green-600 font-semibold"
                        : application.status === "rejected"
                        ? "text-red-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {application.status}
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              {application.status === "pending" && (
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleApprove(application._id)}
                    className="w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition duration-200"
                  >
                    Hire
                  </button>
                  <button
                    onClick={() => handleReject(application._id)}
                    className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition duration-200"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
