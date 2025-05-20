const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

// this connects to the local MongoDB database
const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);
const dbName = "easycal";

// POST route checks if a developer’s email and password match our devLogins database
router.post("/check", async (req, res) => {
  const { email, password } = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);
    const devLogins = db.collection("devLogins");

    const user = await devLogins.findOne({ email, password });

    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
