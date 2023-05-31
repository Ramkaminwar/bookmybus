const btn = document.querySelector("#submit_btn");

btn.addEventListener("click", submitform);

function submitform() {
  const name = document.querySelector("#name").value;
  const query = document.querySelector("#query").value;
  const phone_no = document.querySelector("#Phone_no").value;
  const email = document.querySelector("#email").value;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("name", name);
  urlencoded.append("query", query);
  urlencoded.append("Phone_no", phone_no);
  urlencoded.append("email", email);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("httP://localhost/savedata", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      alert("Submitted Successfully");
      location.replace("http://127.0.0.1:5500");
    })
    .catch((error) => alert("Error Ocurred"));
}
