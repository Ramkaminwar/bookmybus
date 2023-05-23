// We Will Fetch Data of cities for the selection option

fetch("http://localhost/city_list")
  .then((data) => {
    return data.json();
  })
  .then((post) => {
    console.log(post);
  });

var now = new Date(),
  // minimum date the user can choose, in this case now and in the future
  minDate = now.toISOString().substring(0, 10);

$("#date").prop("min", minDate);

var search_btn = document.querySelector("#search");

search_btn.addEventListener("click", Submit_form);

function Submit_form() {
  fetch("http://localhost")
    .then((data) => {
      return data;
    })
    .then((post) => {
      console.log(post);
    });
}
document
  .querySelector("body > section > form")
  .addEventListener("submit", Submit_form);
