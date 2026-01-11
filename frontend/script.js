// 🔗 LIVE BACKEND URL
const BASE_URL = "https://smart-pill-box.onrender.com";

// check server
async function checkServer() {
  try {
    const res = await fetch(`${BASE_URL}/status`);
    const data = await res.json();

    if (data.running) {
      alert("Server Connected ✅");
    } else {
      alert("Server not running ❌");
    }
  } catch (err) {
    alert("Server error ❌");
  }
}

// save medicine details
async function saveDetails() {
  const morning = document.getElementById("morning").value;
  const afternoon = document.getElementById("afternoon").value;
  const night = document.getElementById("night").value;
  const total = document.getElementById("total").value;

  try {
    const res = await fetch(`${BASE_URL}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        morning,
        afternoon,
        night,
        total
      })
    });

    const data = await res.json();
    document.getElementById("msg").innerText = data.message || "Saved!";
  } catch (err) {
    document.getElementById("msg").innerText = "Error saving data ❌";
  }
}
