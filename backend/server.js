const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Status API
app.get("/status", (req, res) => {
  res.json({ running: true });
});

// Save API
app.post("/save", (req, res) => {
  console.log("Data:", req.body);
  res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
