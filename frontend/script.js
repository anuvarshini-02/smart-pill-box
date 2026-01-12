function checkServer() {
  fetch("/status")
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerText =
        data.running ? "✅ Server Connected" : "❌ Server Down";
    })
    .catch(() => {
      document.getElementById("result").innerText = "❌ Server Error";
    });
}
