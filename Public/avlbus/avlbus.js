const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const source = urlParams.get("mycity1");
const desti = urlParams.get("mycity2");
var finaldata = "";
fetch(`http://localhost/search_bus?source=${source}&desti=${desti}`)
  .then((buses) => {
    return buses.json();
  })
  .then((post) => {
    finaldata = post;

    for (let [index, element] of post.entries()) {
      $("#buses").append(`<div id="details" class="mainbox">
      <div id="box1" class="cbox">Agency Name: <p>${element.Agency}</p> </div>
      <div id="box2" class="cbox">Source:<p>${element.source}</p>  </div>
      <div id="box3" class="cbox">Destination:<p>${element.destination}</p>  </div>
      <div id="box4" class="cbox">Pick-up Time: <p>${element.pickup_time}</p> </div>
      <div id="box5" class="cbox">Drop Time:<p>${element.drop_time}</p>  </div>
      <div id="box6" class="cbox">Price: <p>${element.price}</p> </div>
      <div id="submit_btn")>Book Now</div>
  </div>`);
    }
    if (post.length === 0) {
      $("#buses").append(`<p class="error">No Buses Found</p>`);
    }
    var now = new Date(),
      // minimum date the user can choose, in this case now and in the future
      minDate = now.toISOString().substring(0, 10);

    $("#box7").prop("min", minDate);
  });

function myFunction(a) {
  console.log(document.querySelector("#box7").value);
  if (document.querySelector("#box7").value === "") {
    alert("Date Not Provided");
  } else {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("name", "Kedar");
    urlencoded.append("Age", "20");
    urlencoded.append("Phone_no", "8390883312");
    urlencoded.append("email", "ramkaminwar411@gmail.com");
    urlencoded.append("source", finaldata[a].source);
    urlencoded.append("destination", finaldata[a].destination);
    urlencoded.append("date", document.querySelector("#box7").value);
    urlencoded.append("ticket_no", "639");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    fetch("httP://localhost/Booke_ticket", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        alert(
          `\nCongratulations!!\nYour ${finaldata[a].source} to ${finaldata[a].destination} Ticket of price ${finaldata[a].price} is Booked`
        );
        window.location.replace("/");
      })
      .catch((error) => alert("Error Ocurred"));
  }
}

// Popup code

const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal__overlay");
const closeBtn = document.querySelector(".modal__close-btn");

// ---- ---- add active and cookie ---- ---- //
const displayModal = () => {
  modal.classList.add("active");
  modalOverlay.classList.add("active");
};
$("#submit_btn").addEventListener("click", displayModal);

// ---- ---- remove active ---- ---- //
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  modalOverlay.classList.remove("active");
});
