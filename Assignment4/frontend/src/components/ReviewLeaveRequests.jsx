import React, { useEffect, useState } from "react";

export default function PendingLeaveRequests() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPendingRequests() {
      try {
        const response = await fetch("http://localhost:8080/api/leaveRequests");
        const data = await response.json();
        const pending = data.filter(
          (request) => request.status.toLowerCase() === "pending"
        );
        setPendingRequests(pending);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pending leave requests:", error);
        setLoading(false);
      }
    }

    fetchPendingRequests();
  }, []);

  // Approve handler
  const handleApprove = (id) => {
    setPendingRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === id ? { ...request, status: "approved" } : request
      )
    );
  };

  // Reject handler
  const handleReject = (id) => {
    setPendingRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === id ? { ...request, status: "rejected" } : request
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
        Pending Leave Requests
      </h1>

      {loading ? (
        <p className="text-gray-700">Loading pending requests...</p>
      ) : pendingRequests.length === 0 ? (
        <p className="text-gray-700">
          No pending leave requests at the moment!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-semibold mb-2">
                {request.first_name} {request.last_name}
              </h2>
              <p className="text-gray-600">
                <strong>Employee ID:</strong> {request.employeeId}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {request.emailAddress}
              </p>
              <p className="text-gray-600">
                <strong>Job Title:</strong> {request.jobTitle}
              </p>
              <p className="text-gray-600">
                <strong>Leave Type:</strong> {request.leaveType}
              </p>
              <p className="text-gray-600">
                <strong>Number of Days:</strong> {request.numberOfDays}
              </p>
              <p className="text-gray-600">
                <strong>Leave Date:</strong> {request.leaveDate}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    request.status === "approved"
                      ? "text-green-600 font-semibold"
                      : request.status === "rejected"
                      ? "text-red-600 font-semibold"
                      : "text-yellow-600 font-semibold"
                  }
                >
                  {request.status}
                </span>
              </p>

              {request.status === "pending" && (
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleApprove(request._id)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request._id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
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
