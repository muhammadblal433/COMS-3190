import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [pendingJobCount, setPendingJobCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [uniqueJobCount, setUniqueJobCount] = useState(0);

  useEffect(() => {
    async function fetchPendingLeaveRequests() {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/leaveRequests");
        const data = await response.json();
        const pending = data.filter(
          (request) => request.status.toLowerCase() === "pending"
        );
        setPendingLeaveCount(pending.length);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    }

    fetchPendingLeaveRequests();
  }, []);

  useEffect(() => {
    async function fetchPendingJobRequests() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8080/api/jobApplications"
        );
        const data = await response.json();
        const pending = data.filter(
          (request) => request.status.toLowerCase() === "pending"
        );
        setPendingJobCount(pending.length);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    }

    fetchPendingJobRequests();
  }, []);

  useEffect(() => {
    async function fetchJobPostings() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/jobApplications"
        );
        const data = await response.json();
        const jobIds = data
          .map((application) => application.jobId)
          .filter((id) => id !== undefined && id !== null && id !== "");
        const uniqueJobIds = new Set(jobIds);
        setUniqueJobCount(uniqueJobIds.size);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    }

    fetchJobPostings();
  }, []);

  useEffect(() => {
    async function fetchApprovedLeaveRequests() {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/leaveRequests");
        const data = await response.json();
        const pending = data.filter(
          (request) => request.status.toLowerCase() === "approved"
        );
        setApprovedCount(pending.length);
      } catch (error) {
        console.error("Error fetching approved leave requests:", error);
      }
    }

    fetchApprovedLeaveRequests();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-white shadow-md flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold pl-8 text-black">CycloneHR</div>
          </div>
          <div className="text-2xl font-bold pl-8 text-black">
            Construction of User Interfaces
          </div>
          <div className="space-x-8 pr-8">
            <img
              src="https://logowik.com/content/uploads/images/iowa-state-university-wordmark5036.logowik.com.webp"
              alt="Iowa State Logo"
              className="w-40 h-auto"
            />
          </div>
        </nav>

        {/* Banner */}
        <div className="w-full">
          <img
            src="https://media-hosting.imagekit.io/a90b266c36df42b8/welcome.png?Expires=1840479728&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Cb-~1EsVSpMQMmg~Ivjd3XSXYvj42KojOO-s9Odvokr3-9BEtZKTTjnL3JRops5c6WbMz3xh1t-pIywcPD2tSTEoCmZ2gJgN~t~ZSQ783~1Ko2DIt2ta-T6TwtJVQfB9QsefmuiH04gNJqbt8-WIbMQwJCNl3c0Ed5BqBASyn8TLqZThdUR7C60-loOQcvDLBpWJ57q~TKcFXtYGwb2r6~y02lBH75s07uFMKroaiQcJymmmgAHNaqIkrMMnQwX7LYWCBKIfvCY6knBW-YhhvT-tqKipALA4sOH1bUu3-PnyBBnWIvBCC84kTYrd-QClkVY7QEuhDn1dhYa5EN0qvQ__"
            alt="Iowa State University Banner"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Welcome Section */}
        <section className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Good Afternoon, Cyclone!
          </h1>
          <p className="text-gray-600 text-lg">
            It's{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            .
          </p>
        </section>

        {/* Cards Section */}
        <section className="px-8 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Awaiting Action Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Awaiting Your Action
              </h2>
              <p className="text-gray-600 mb-3">
                You have {pendingLeaveCount} pending leave{" "}
                {pendingLeaveCount === 1 ? "request" : "requests"} to review.
              </p>
            </div>
            <Link to="/pending-requests" className="w-full">
              <button className="w-full bg-red-800 hover:bg-[#FFD700] text-white hover:text-black font-semibold py-2 px-4 rounded transition duration-200">
                Review Leave Requests
              </button>
            </Link>
            <p className="text-gray-600 mt-3">
              You have {pendingJobCount} pending job{" "}
              {pendingJobCount === 1 ? "application" : "applications"} to
              review.
            </p>
            <Link to="/pending-job-apps" className="w-full">
              <button className="mt-2 w-full bg-red-800 hover:bg-[#FFD700] text-white hover:text-black font-semibold py-2 px-4 rounded transition duration-200">
                Review Job Applications
              </button>
            </Link>
          </div>

          {/* Timely Suggestions Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4">Timely Suggestions</h2>

              <div className="flex flex-col space-y-4">
                {/* Modify Leave Requests */}
                <Link to="/modify-leave-request" className="w-full">
                  <button className="w-full bg-red-800 hover:bg-[#FFD700] text-white hover:text-black font-semibold py-2 px-4 rounded transition duration-200">
                    Modify Leave Request
                  </button>
                </Link>

                {/* Modify Job Applications */}
                <Link to="/modify-job-app" className="w-full">
                  <button className="w-full bg-red-800 hover:bg-[#FFD700] text-white hover:text-black font-semibold py-2 px-4 rounded transition duration-200">
                    Modify Job Application
                  </button>
                </Link>

                {/* Delete Leave Requests */}
                <Link to="/delete-leave-request" className="w-full">
                  <button className="w-full bg-red-800 hover:bg-[#FFD700] text-white hover:text-black font-semibold py-2 px-4 rounded transition duration-200">
                    Delete Leave Application
                  </button>
                </Link>

                {/* Delete Job Applications */}
                <Link to="/delete-job-app" className="w-full">
                  <button className="w-full bg-red-800 hover:bg-[#FFD700] text-white hover:text-black font-semibold py-2 px-4 rounded transition duration-200">
                    Delete Job Application
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Tasks Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4">Quick Tasks</h2>
              <div className="flex flex-col space-y-2">
                <Link to="/request-leave" className="w-full">
                  <button className="w-full bg-red-800 hover:bg-[#FFD700] text-white hover:text-black font-semibold py-2 px-4 rounded transition duration-200">
                    Apply for Leave
                  </button>
                </Link>
                <Link to="/apply-job" className="w-full">
                  <button className="w-full bg-red-800 hover:bg-yellow-400 hover:text-black text-white font-semibold py-2 px-4 rounded transition duration-200">
                    Submit Job Application
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Announcements Section */}
        <section className="px-8 py-6">
          <h2 className="text-2xl font-bold mb-4">Announcements</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Final Project Presentations will be held from{" "}
                <strong>May 12 to May 15</strong>. TA availability slots will be
                released during the first week of May — please reserve your slot
                as soon as possible.
              </li>
              <li>
                Ensure all components of your project are completed before your
                scheduled demo. TAs will grade projects immediately during the
                demo session.
              </li>
              <li>
                <strong>Important:</strong> Any missing functionality or
                incomplete submissions at the time of demo will be graded as
                <span className="text-red-600 font-semibold"> 0</span> — no late
                submissions will be accepted.
              </li>
              <li>
                Final documentation (README, setup instructions, or project
                report) must be uploaded before your demo session.
              </li>
              <li>
                Practice your demo ahead of time — each team will have only 10
                minutes to present and answer questions.
              </li>
            </ul>
          </div>
        </section>

        {/* Summary Stats Section */}
        <section className="px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Leaves Applied
            </h3>
            <p className="text-2xl font-extrabold text-red-700 mt-2">
              {approvedCount}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Pending Applications
            </h3>
            <p className="text-2xl font-extrabold text-red-700 mt-2">
              {pendingLeaveCount}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              New Job Openings
            </h3>
            <p className="text-2xl font-extrabold text-red-700 mt-2">
              {uniqueJobCount}
            </p>
          </div>
        </section>

        {/* Upcoming Important Dates */}
        <section className="px-8 py-6 mb-10">
          <h2 className="text-2xl font-bold mb-4">Upcoming Important Dates</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col space-y-4 text-gray-700">
              <div>
                <strong>First Week of May</strong> — TA availability slots open
                for reserving Final Project Demo times.
              </div>
              <div>
                <strong>May 12 to May 15, 2025</strong> — Final Project
                Presentation sessions (grading will occur immediately after each
                demo).
              </div>
              <div>
                <strong>May 16, 2025</strong> — Official last day of the Spring
                2025 semester.
              </div>
              <div>
                <strong>May 17, 2025 @ 12:00 PM</strong> — Final grades will be
                posted on Canvas.
              </div>
              <div>
                <strong>May 17, 2025 @ 6:00 PM</strong> — Deadline to submit any
                grade contest requests.
              </div>
              <div>
                <strong>May 17, 2025 @ 6:15 PM</strong> — Final grades submitted
                to the Registrar’s Office; no changes allowed after this point.
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
