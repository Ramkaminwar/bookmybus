// We Will Fetch Data of cities for the selection option

fetch("http://localhost/city_list")
  .then((data) => {
    return data.json();
  })
  .then((post) => {
    post.forEach((element) => {
      $("#mycity1").append(`<option value=${element} >${element}</option>`);
      $("#mycity2").append(`<option value=${element} >${element}</option>`);
    });
  });

var now = new Date(),
  // minimum date the user can choose, in this case now and in the future
  minDate = now.toISOString().substring(0, 10);

// $("#date").prop("min", minDate);

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
      $("#result").append(`<h3>${element.Agency}</h3>`);
    });
  });
