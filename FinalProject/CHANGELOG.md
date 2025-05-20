CHANGELOG.md
EasyCal Final Project

## Final Integration Summary:
This version marks the full backend-frontend integration of the EasyCal app. We completed the full stack roundtrip for all major features and ensured they work smoothly between the React frontend, Node.js backend, MongoDB database, and external APIs.

## New Features & Final Integrations:
AI Recipe Generation (Ollama Integration)
→ Integrated Ollama’s tinyllama:1.1b-chat model to power our “AI Recipe Generator.”
→ Frontend sends user input to our Python FastAPI (aiServer.py), which talks to Ollama’s local LLM API.
→ Backend handles the AI response and sends a clean recipe back to the frontend.

## Nutritionix API Flow Polishing:
→ Cleaned up and improved the data flow between our React frontend and the Nutritionix API backend.
→ Added better error handling and ensured smooth user experience when pulling nutritional data.

## Backend API & CRUD Operations:
→ Recipes API (MongoDB):
GET /api/recipes → Fetch all recipes
POST /api/recipes → Add a new recipe
PUT /api/recipes/:id → Update a recipe
DELETE /api/recipes/:id → Delete a recipe

→ Restaurants API (MongoDB):
GET /api/restaurants → Fetch all restaurants
POST /api/restaurants → Add a new restaurant
PUT /api/restaurants/:id → Update restaurant info
DELETE /api/restaurants/:id → Remove a restaurant

→ Dev Logins API:
POST /api/devLogins/check → Verify developer credentials against the devLogins collection
Enables developer-only actions like Add, Edit, and Delete on the frontend

## Backend Updates & Improvements:
→ Fully implemented RESTful routes with Express.js and MongoDB
→ Created new route handlers for team members and popular features data
→ Added robust error handling for all API endpoints
→ Added input validation for developer login to block invalid or empty requests

## Frontend Updates:
→ Replaced all mock APIs with real backend fetch calls
→ Implemented secure developer login gating (hides Add/Edit/Delete buttons for regular users)
→ Polished UX for forms, modals, and CRUD actions
→ Connected AI features and Nutritionix API calls to live backend data

## Documentation & Code Cleanup:
→ README.md updated with complete setup instructions, including:
→ AI backend (aiServer.py + Ollama)
→ Node.js backend (server.js)
→ MongoDB integration
→ Frontend setup and local run guide
→ CHANGELOG.md (this file) added to track all final project updates
→ Removed unused code, test fragments, and debug logs
→ Added clear code comments across backend and frontend

## Final Testing & Status:
→ All frontend pages work with live backend data
→ Developer login works correctly to control admin-only actions
→ AI recipe generation works and returns valid outputs
→ Nutritionix integration polished and functioning
→ No known critical bugs
→ Code fully committed and merged to main branch

## Team Contributions:
→ Brian Craciun — Initializing all Frontend Components, completing the footer and navbar for the site. Fully applying and integrating the Nutritionix API, as well as integrating and filtering results for RecipeAI. Equal contribution to server.js.

→ Muhammad Blal — Worked on finalizing all components. Linked MongoDB components, and created the developer login for access to CRUD operation on both PopularRecipe.jsx and PopularRestaurants.jsx. Equal contribution to server.js.