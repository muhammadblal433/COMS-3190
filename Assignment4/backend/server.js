// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

// ── 1. basic app middleware ──────────────────────────────
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ── 2. MongoDB connection (local default) ────────────────
const uri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
await client.connect();                         // ⬅ blocks until DB is ready
app.locals.db = client.db('CycloneHR');         // make db handle visible to routers

// ── 3. mount feature routers ─────────────────────────────
import leaveRequests from './routes/leaveRequests.js';
import jobApplications from './routes/jobApplications.js';

app.use('/api/leaveRequests',   leaveRequests);
app.use('/api/jobApplications', jobApplications);

// ── 4. launch server ─────────────────────────────────────
const PORT = 8080;
app.listen(PORT, () =>
  console.log(`🚀 CycloneHR backend running on http://localhost:${PORT}`)
);
