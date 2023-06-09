const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const source = urlParams.get("mycity1");
const desti = urlParams.get("mycity2");

post = [
  {
    _id: "646e2358354ebf0060875814",
    Agency: "Sharma Travels",
    source: "Mumbai",
    destination: "Pune",
    pickup_time: "10:00 AM",
    drop_time: "1:00 PM",
    price: 400,
  },
  {
    _id: "646f9a6a8405abc7388ceb15",
    Agency: "Sharma Travels",
    source: "Pune",
    destination: "Mumbai",
    pickup_time: "08:00 PM",
    drop_time: "11:00 PM",
    price: 500,
  },
  {
    _id: "646f9a6a8405abc7388cep15",
    Agency: "Royal Travels",
    source: "Nanded",
    destination: "Pune",
    pickup_time: "10:00 AM",
    drop_time: "08:00 AM",
    price: 1200,
  },
  {
    _id: "646f9a6a8405abc7388cep16",
    Agency: "Prasanna Purple Grand",
    source: "Pune",
    destination: "Nanded",
    pickup_time: "09:00 PM",
    drop_time: "10:00 AM",
    price: 1500,
  },
];

console.log(post);
post.forEach((element, index) => {
  $("#buses").append(`<div id="details" class="mainbox">
      <div id="box1" class="cbox">Agency Name: <p>${element.Agency}</p> </div>
      <div id="box2" class="cbox">Source:<p>${element.source}</p>  </div>
      <div id="box3" class="cbox">Destination:<p>${element.destination}</p>  </div>
      <div id="box4" class="cbox">Pick-up Time: <p>${element.pickup_time}</p> </div>
      <div id="box5" class="cbox">Drop Time:<p>${element.drop_time}</p>  </div>
      <div id="box6" class="cbox">Price: <p>${element.price}</p> </div>
      <div class="bookbtn" onclick="displayModal(${index})">Book Bus</div>
  </div>`);
});
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal__overlay");
const closeBtn = document.querySelector("#modal__close-btn");

var now = new Date(),
  minDate = now.toISOString().substring(0, 10);
$("#query").prop("min", minDate);

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
finaldata = post;

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
    urlencoded.append("source", finaldata[a].source);
    urlencoded.append("destination", finaldata[a].destination);
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
          window.location.replace("/");
        } else {
          alert("Server Error Ocurred");
        }
        console.log(result);
      })
      .catch((error) => alert("Error Ocurred"));
  }
}
