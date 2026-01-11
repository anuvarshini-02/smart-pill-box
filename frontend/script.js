const API_URL = "https://smart-pill-box.onrender.com";

function checkServer() {
  fetch(API_URL + "/status")
    .then(res => res.json())
    .then(data => {
      alert("Server Connected ✅");
      console.log(data);
    })
    .catch(err => {
      alert("Server NOT Connected ❌");
      console.error(err);
    });
}
