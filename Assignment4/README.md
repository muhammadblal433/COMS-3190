# CycloneHR Backend Setup

## 📦 Project Overview

This project implements the backend services for the CycloneHR application using Node.js (Express) and MongoDB.  
You are tasked with developing CRUD APIs for **Leave Requests** and **Job Applications** features.

---

## 🚀 Installation Instructions

After cloning your repository:

1. Install backend dependencies:

   ```bash
   cd backend
   npm init
   npm install express cors body-parser mongodb
   ```

2. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

---

## ⚙️ Running the Server

1. Make sure your **MongoDB** server is running locally.
2. Navigate to the `backend/` folder and start the server:
   ```bash
   nodemon server.js
   ```
3. Server will run at:
   ```
   http://localhost:8080
   ```

---

## 📂 MongoDB Setup

- **Database Name**: `CycloneHR`
- **Collections**:
  - `LeaveRequests`
  - `JobApplications`

> Ensure the field names and collection names exactly match the provided JSON files.

---

## 🛠️ Tasks

- Implement all **CRUD APIs** for:
  - Leave Requests (`routes/leaveRequests.js`)
  - Job Applications (`routes/jobApplications.js`)
- Integrate both routers properly in `server.js` under `/api` base path.

### Feature Division

- **Team Member 1**: Leave Requests feature
- **Team Member 2**: Job Applications feature

---

## 🔀 GitLab Workflow

- Each member must work on a **separate feature branch**:
  - `feature/leaveRequests/<your-name>`
  - `feature/jobApplications/<your-name>`
- Use **Merge Requests** for review and merging.
- **Do not commit directly** to `main` branch.

---

## 📝 Submission Instructions

- Push all backend code inside the `backend/` folder in GitLab.
- Submit your GitLab repository link on Canvas.

---

# 📚 Good Luck!
