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
      $("#buses").append(`<div class="box" id="box1">${element.Agency}</div>`);
    });
  });
