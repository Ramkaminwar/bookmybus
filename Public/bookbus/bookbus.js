const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const source = urlParams.get("mycity1");
const desti = urlParams.get("mycity2");

fetch(`http://localhost/search_bus?source=${source}&desti=${desti}`)
  .then((buses) => {
    return buses.json();
  })
  .then((post) => {
    console.log(post);
    post.forEach((element) => {
      $("#buses").append(`<div id="details" class="mainbox">
      <div id="box1" class="cbox">Agency Name: <p>${element.Agency}</p> </div>
      <div id="box2" class="cbox">Source:<p>${element.source}</p>  </div>
      <div id="box3" class="cbox">Destination:<p>${element.destination}</p>  </div>
      <div id="box4" class="cbox">Pick-up Time: <p>${element.pickup_time}</p> </div>
      <div id="box5" class="cbox">Drop Time:<p>${element.drop_time}</p>  </div>
      <div id="box6" class="cbox">Price: <p>${element.price}</p> </div>
      <div class="bookbtn" onclick=myFunction("${element.source}","${element.destination}")>Book Now</div>
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
  // minimum date the user can choose, in this case now and in the future
  minDate = now.toISOString().substring(0, 10);

$("#date").prop("min", minDate);
