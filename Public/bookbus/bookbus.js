const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const source = urlParams.get("mycity1");
const desti = urlParams.get("mycity2");
var finaldata = "";
var a = null;
fetch(`http://localhost/search_bus?source=${source}&desti=${desti}`)
  .then((buses) => {
    return buses.json();
  })
  .then((post) => {
    finaldata = post;
    post.forEach((element, index) => {
      $("#buses").append(`<div id="details" class="mainbox">
      <div id="box1" class="cbox">Agency Name: <p>${element.Agency}</p> </div>
      <div id="box2" class="cbox">Source:<p>${element.source}</p>  </div>
      <div id="box3" class="cbox">Destination:<p>${element.destination}</p>  </div>
      <div id="box4" class="cbox">Pick-up Time: <p>${element.pickup_time}</p> </div>
      <div id="box5" class="cbox">Drop Time:<p>${element.drop_time}</p>  </div>
      <div id="box6" class="cbox">Price: <p>${element.price}</p> </div>
      <div class="submit_btn" onclick="displayModal(${index})">Book Bus</div>
  </div>`);
    });
    if (post.length === 0) {
      $("#buses").append(`<p class="error">No Buses Found</p>`);
    }
  });

function myFunction(a, b) {
  alert(`\nCongratulations!!\nYour ${a} to ${b} Ticket is Booked`);
}

function myFunction() {
  alert(`Your Ticket is Booked, Please Check your email for e-ticket`);
}

var now = new Date(),
  minDate = now.toISOString().substring(0, 10);
$("#query").prop("min", minDate);

const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal__overlay");
const closeBtn = document.querySelector("#modal__close-btn");

const random = () => {
  let x = Math.floor(Math.random() * 100000 + 1);
  return x;
};

const displayModal = (b) => {
  a = b;
  modal.classList.add("active");
  modalOverlay.classList.add("active");
};
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  modalOverlay.classList.remove("active");
});

function myFunction() {
  if (document.querySelector("#query").value === "") {
    alert("Date Not Provided");
  } else {
    var myHeaders = new Headers();
    console.log(finaldata);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("user_name", document.querySelector("#user_name").value);
    urlencoded.append("phone_no", document.querySelector("#phone_no").value);
    urlencoded.append("email", document.querySelector("#email").value);
    urlencoded.append("source", source);
    urlencoded.append("destination", desti);
    urlencoded.append("date", document.querySelector("#query").value);
    urlencoded.append("Agency", finaldata[a].Agency);
    urlencoded.append("ticket_no", random());
    urlencoded.append("pickup_time", finaldata[a].pickup_time);
    urlencoded.append("drop_time", finaldata[a].drop_time);
    urlencoded.append("price", finaldata[a].price);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    fetch("httP://localhost/Booke_ticket", requestOptions)
      .then((response) => response)
      .then((result) => {
        console.log(result.status);
        if (result.status !== 500) {
          alert(
            `\nCongratulations!!\nYour ${finaldata[a].source} to ${finaldata[a].destination} Ticket of price ${finaldata[a].price} is Booked`
          );
        } else {
          alert("Server Error Ocurred");
        }
        console.log(result);
      })
      .catch((error) => alert("Error Ocurred"));
  }
}
