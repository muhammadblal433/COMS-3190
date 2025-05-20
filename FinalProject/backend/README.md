🧠 EasyCal Project Setup
Welcome to EasyCal - an AI-powered nutrition and recipe app!
This guide walks you through setting up the project locally for the first time.

## Prerequisites
Before you begin, make sure you have these installed on your system:

✅ Node.js (v16 or higher)
✅ Python 3.9+
✅ pip (Python package manager)
✅ MongoDB (local or remote instance)
✅ Ollama → download from the website (https://ollama.com/download) for AI model support

## Installation
1️⃣ Run this once inside your /backend folder:
Backend dependencies:
Run this inside the /backend folder:
npm install
pip install fastapi uvicorn requests

2️⃣ Frontend dependencies:
Run this inside the /frontend folder:
npm install

## How to Run Everything
You'll need 4 terminal windows open to run everything:

1️⃣ Start the Frontend (React + Vite)
cd frontend
npm run dev

This runs the React app at: http://localhost:5173/

2️⃣ Start the Node.js Express Backend API
cd backend
npm run dev

This runs the Express server at: http://localhost:3000/
This server connects to MongoDB

3️⃣ Start the AI FastAPI Server (Python)
cd backend
uvicorn aiServer:app --host 127.0.0.1 --port 5005

This runs the AI middleware at: http://127.0.0.1:5005/

4️⃣ Start the Ollama AI Model
First time only, pull the model, AND MAKE SURE TO DOWNLOAD OLLAMA FROM WEBSITE (https://ollama.com/download) FIRST, as mentioned in our Prerequisites.
ollama pull tinyllama:1.1b-chat

Then, every time you start:
ollama run tinyllama:1.1b-chat

This runs the Ollama LLM server at: http://localhost:11434/

✅ Quick Summary
frontend → React app (localhost:5173)
backend → Node.js API (localhost:3000)
aiServer (backend) → Python FastAPI (localhost:5005)
ollama (backend) → LLM model server (localhost:11434)

