const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1>Smart Pill Box</h1>
    <p>Backend is running successfully 🚀</p>
    <p>Status: Active</p>
  `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
