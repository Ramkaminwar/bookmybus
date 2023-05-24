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
      $("#box1").append(`<div class="box" id="box1">${element.Agency}</div>`);
      $("#box2").append(`<div class="box" id="box2">${element.source}</div>`);
      $("#box3").append(`<div class="box" id="box3">${element.destination}</div>`);
      $("#box4").append(`<div class="box" id="box4">${element.pickup_time}</div>`);
      $("#box5").append(`<div class="box" id="box5">${element.drop_time}</div>`);
      $("#box6").append(`<div class="box" id="box6">${element.price}</div>`);
    });
  });


  function myFunction() {
    alert("\nCongratulations!!\nYour Ticket is Booked");
  }