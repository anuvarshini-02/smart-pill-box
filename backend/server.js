const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Test API
app.get("/status", (req, res) => {
  res.json({ status: "Backend is running" });
});

// Default route → frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Port for Render
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
