const btn = document.querySelector("#submit_btn");

btn.addEventListener("click", submitform);

function submitform() {
  const name = document.querySelector("#name").value;
  const age = document.querySelector("#Age").value;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("age", age);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("httP://localhost/savedata", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
