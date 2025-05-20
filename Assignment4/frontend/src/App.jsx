import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import PendingLeaveRequests from "./components/ReviewLeaveRequests";
import LeaveRequests from "./components/LeaveRequests";
import ApplyJob from "./components/JobApplications";
import PendingJobApps from "./components/ReviewJobApplications";
import ModifyLeaveRequest from "./components/ModifyLeaveRequests";
import ModifyJobApplication from "./components/ModifyJobApp";
import DeleteLeaveRequest from "./components/DeleteLeaveRequest";
import DeleteJobApplication from "./components/DeleteJobApp";
import Footer from "./components/Footer"; // <-- Import Footer here

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/pending-requests"
              element={<PendingLeaveRequests />}
            />
            <Route path="/request-leave" element={<LeaveRequests />} />
            <Route path="/apply-job" element={<ApplyJob />} />
            <Route path="/pending-job-apps" element={<PendingJobApps />} />
            <Route
              path="/modify-leave-request"
              element={<ModifyLeaveRequest />}
            />
            <Route path="/modify-job-app" element={<ModifyJobApplication />} />
            <Route path="/delete-job-app" element={<DeleteJobApplication />} />
            <Route
              path="/delete-leave-request"
              element={<DeleteLeaveRequest />}
            />
          </Routes>
        </div>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
