# **Final Project Repository – SE/COM S 3190**

Welcome to the Final Project Repository for SE/COM S 3190 – Construction of User Interfaces (Spring 2025). This repository contains the full-stack web application **EasyCal**, designed to help users track nutrition, build meal plans, and make informed dietary choices using real-time food data.

---

## 🧪 Local Setup (Coming Soon)

- This section will include step-by-step setup instructions for running the frontend and backend locally, database connection details, and `.env` variable requirements.  
- To be completed during the development phase.

---

## 🍽️ Project Overview

**EasyCal** is a single-page full-stack application that allows users to:

- Search food items and view nutritional breakdowns  
- Create personalized meal plans  
- Track daily calorie intake  
- Save favorite dishes and auto-generate grocery lists  
- Submit feedback for future improvements

The application uses:

- React.js for the frontend  
- Node.js + Express for backend API routes and logic  
- MongoDB for data persistence  
- Nutritionix API as an external source for food and nutrition data

---

## 🖥️ Key Functional Pages

1️⃣ **Login / Signup Page**  
Handles user registration, login, and authentication  

2️⃣ **Home (Search Interface)**  
Search and view food data using the Nutritionix API  

3️⃣ **Food Details View**  
Show calories, macros, and serving sizes; save to profile or meal plan  

4️⃣ **Meal Planner View**  
Create weekly meal plans using saved or searched foods  

5️⃣ **Calorie Tracker View**  
Log food entries and monitor intake with visual dashboards  

6️⃣ **About / Team Page**  
Bios, photos, and course details

---

## 📂 Folder Structure

```plaintext
EasyCal/
├── frontend/                 # React frontend
│   └── src/
│       ├── assets/           # Images, JSON files, and static resources
│       ├── components/       # All React components (e.g., Navbar, SearchBar, etc.)
│       ├── App.jsx           # Main app component with route definitions
│       └── main.jsx          # Entry point for React app
├── backend/                  # Node.js/Express backend
│   ├── routes/               # API route handlers
│   ├── controllers/          # API logic and processing
│   ├── models/               # MongoDB schemas
│   └── server.js             # Express entry point
├── Documents/                # Project documentation
│   ├── wireframes/           # UI sketches (Excalidraw, Draw.io)
│   ├── SoftwareArchitecture.pdf
│   ├── FinalReport.pdf
│   └── DemoVideo.mp4
└── README.md                 # Project overview and setup instructions
```
## 📄 Project Plan

### 🧠 Overview

EasyCal is a full-stack application that merges user nutrition management with real-time API data. The goal is to build a responsive and intuitive experience using modern web technologies.

---

## 👥 Roles & Responsibilities

### 👤 Muhammad Blal

- **Login & Signup Page** – Auth system and secure user access  
- **Search & Filter Page** – Food search via Nutritionix API  
- **Feedback & Survey Page** – Submit suggestions for future features  
- **README + Docs** – Maintains documentation  

### 👤 Brian Craciun

- **Meal Planner Page** – Organize meal plans with saved items  
- **Calorie Tracker Page** – Log food intake with dashboards  
- **Saved Dishes & Grocery List** – Create and store recipes for shopping  
- **GitLab Initialization** – Repository setup and CI config  

### 👥 Shared Tasks

- GitLab Boards, Wireframes, Final Video, Testing

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Bootstrap, Axios  
- **Backend**: Node.js, Express  
- **Database**: MongoDB  
- **External API**: Nutritionix  
- **Tools**: GitLab, Draw.io, Excalidraw

---

## ✨ Feature Summary (from Proposal)

- Nutrition Search (Nutritionix API)  
- User Authentication  
- Meal Planning Tools  
- Calorie Logging Dashboard  
- Saved Dishes & Grocery Lists  
- Feedback Form

---

## ⏱️ Weekly Timeline

| Week    | Milestone                                 |
|---------|--------------------------------------------|
| Apr 14  | GitLab setup, wireframes, feature breakdown|
| Apr 21  | React routing and base layout              |
| Apr 28  | Backend/API integration, user auth         |
| May 5   | Advanced features, styling, polish         |
| May 11  | Final report, video, submission, demo with TA |

---

## ✅ Mini-Assignment 2: React Routing & API Integration

### 🧩 Frontend Changes Made (as of April 29)

- ✅ React routing using `setStep()` for view navigation  
- ✅ `PopularRecipes` and `PopularRestaurants` fully connected to backend  
- ✅ Bootstrap modals integrated for detail views  
- ✅ Dynamic `fetch()` calls for API-connected MongoDB data  
- ✅ Responsive layout and Bootstrap styling maintained  

---

## ✅ Mini-Assignment 3: Integrating our AI API and Polishing (Updated README.md)

- Added RecipeAI
- Polished website and routing
- folder organization and code cleanup/comments
- Run and terminal instructions added to our backend README file

---

### 🔌 Mock API Endpoints (MongoDB + Express)

| Endpoint                 | Method | Description             |
|--------------------------|--------|-------------------------|
| `/api/recipes`           | GET    | Fetch all recipes       |
| `/api/recipes/:id`       | GET    | Fetch single recipe     |
| `/api/recipes`           | POST   | Create new recipe       |
| `/api/recipes/:id`       | PUT    | Update existing recipe  |
| `/api/recipes/:id`       | DELETE | Delete recipe           |
| `/api/restaurants`       | GET    | Fetch all restaurants   |
| `/api/restaurants/:id`   | GET    | Fetch single restaurant |
| `/api/restaurants`       | POST   | Add new restaurant      |
| `/api/restaurants/:id`   | PUT    | Update restaurant       |
| `/api/restaurants/:id`   | DELETE | Delete restaurant       |

---

## 📬 Sample Request Payloads

### ➕ Add a Recipe

```json
POST /api/recipes
{
  "title": "Protein Smoothie",
  "year": 2025,
  "img": "assets/images/recipes/smoothie.png",
  "price": 4.99,
  "ingredients": [
    "1 banana",
    "1 cup almond milk",
    "1 scoop protein powder"
  ],
  "instructions": "Blend all ingredients until smooth. Serve chilled."
}
```

### 📝 Update a Recipe

```json
PUT /api/recipes/:id
{
  "title": "Updated Smoothie",
  "price": 5.25
}
```

---

### 🗑️ Delete a Recipe

```http
DELETE /api/recipes/:id
```

---

## 📅 Final Project Deadlines & Submission

### 🗓️ Final Due Date
**May 11, 2025 @ 11:59 PM CST**  
🔁 *No late submissions allowed*

---

### 🎥 Final Demo Video

- Duration: 3–5 minutes  
- Narrated by both team members  
- Include live app walkthrough + at least one full CRUD operation  
- **Save to:**  
  `Documents/FinalVideo/JK13_FinalVideo.mp4`

---

### 📑 Technical Documentation

- PDF exported from Overleaf  
- **File:** `JK13_TechnicalReport.pdf`  
- **Location:** `Documents/`

---

### 🧪 Live Demo Window

**May 12–15, 2025**  
- In-person with TA  
- Each member must be able to answer technical questions live

---

## 🟩 Mini Assignments

- ✅ MA1: GitLab + Wireframes – *Apr 18*  
- ✅ MA2: React Routing + Working Views – *Apr 29*  
- 🟧 MA3: Backend + CRUD (WIP) + Final Touches To Project – *May 11*  

---

## 📬 Contact Us

**Muhammad Blal**  
📧 [mblal@iastate.edu](mailto:mblal@iastate.edu)

**Brian Craciun**  
📧 [bcraciun@iastate.edu](mailto:bcraciun@iastate.edu)
