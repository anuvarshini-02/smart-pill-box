const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Smart Pill Box Backend Running");
});

// receive patient data
app.post("/patient", (req, res) => {
  const data = req.body;
  console.log("Patient Data:", data);

  res.json({
    message: "Patient data received successfully",
    data: data
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

