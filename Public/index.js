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

$("#date").prop("min", minDate);
