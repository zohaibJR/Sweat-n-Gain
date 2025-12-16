// ✔ FIX 1: dotenv must load BEFORE using process.env
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";

const app = express();

// ✔ FIX 2: Debug line (optional)
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

// CONNECT MONGO
connectDB();

// ROUTE
app.get("/", (req, res) => {
    res.send("Backend running...");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is connected!" });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(cors()); // <-- Allow frontend to talk to backend
app.use(express.json());

