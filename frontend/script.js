// ---------------- DATA ----------------
let patient = {};
let calendarData = [];

// ---------------- SAVE PATIENT ----------------
document.getElementById("pillForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  patient = {
    name: document.getElementById("name").value,
    tablet: document.getElementById("tablet").value,
    morning: parseInt(document.getElementById("morning").value) || 0,
    afternoon: parseInt(document.getElementById("afternoon").value) || 0,
    night: parseInt(document.getElementById("night").value) || 0,
    stock: parseInt(document.getElementById("stock").value) || 0
  };

  patient.dailyTotal =
    patient.morning + patient.afternoon + patient.night;

  // 🔗 SEND TO BACKEND (PORT 3001)
  try {
    const res = await fetch("http://localhost:3001/patient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient)
    });

    const data = await res.json();
    console.log("Saved:", data);

    alert("Details Saved Successfully!");
  } catch (err) {
    console.error(err);
    alert("Server not running!");
  }
});

// ---------------- DAILY STATUS ----------------
function markTaken() {
  if (!patient.dailyTotal) {
    alert("Please save patient details first!");
    return;
  }

  if (patient.stock < patient.dailyTotal) {
    alert("⚠ Not enough tablets in stock!");
    return;
  }

  patient.stock -= patient.dailyTotal;

  addCalendar("✔ Taken");
  updateStatus("✔ Patient took medicine today");

  if (patient.stock <= patient.dailyTotal * 3) {
    alert("⚠ Stock is low! Refill soon.");
  }
}

function markMissed() {
  addCalendar("❌ Missed");
  updateStatus("❌ Patient missed today’s dose");
}

// ---------------- UI UPDATE ----------------
function updateStatus(msg) {
  document.getElementById("status").innerHTML = `
    <p>${msg}</p>
    <p>Remaining Stock: ${patient.stock}</p>
  `;
}

// ---------------- CALENDAR ----------------
function addCalendar(status) {
  const today = new Date().toLocaleDateString();
  const record = `${today} → ${status}`;

  calendarData.push(record);

  const li = document.createElement("li");
  li.textContent = record;
  document.getElementById("calendar").appendChild(li);
}
