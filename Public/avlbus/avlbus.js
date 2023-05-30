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
      <div class="btn" onclick=myFunction("${index}")>Book Now</div>
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
    urlencoded.append("email", "202151047@iiitvadodara.ac.in");
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
        console.log(result);
      })
      .catch((error) => alert("Error Ocurred"));
  }
}
