const BASE_URL = "https://smart-pill-box.onrender.com";

async function checkServer() {
  try {
    const res = await fetch(`${BASE_URL}/status`);
    const data = await res.json();

    if (data.running) {
      document.getElementById("status").innerText = "Server Connected ✅";
    } else {
      document.getElementById("status").innerText = "Server not running ❌";
    }
  } catch (e) {
    document.getElementById("status").innerText = "Server error ❌";
  }
}
