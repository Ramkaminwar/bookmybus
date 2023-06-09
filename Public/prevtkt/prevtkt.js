fetch(`http://localhost/get_Ticket`)
  .then((buses) => {
    return buses.json();
  })
  .then((post) => {
    console.log(post);
    post.forEach((element, index) => {
      $("#buses").append(`<div id="details" class="mainbox">
      <div id="boxd" class="cbox">Booking no<p>${element.ticket_no}</p></div>
      <div id="boxd" class="cbox">Date:<p>${element.date}</p></div>
      <div id="box1" class="cbox">Agency Name: <p>${element.Agency}</p> </div>
      <div id="box2" class="cbox">Source:<p>${element.source}</p>  </div>
      <div id="box3" class="cbox">Destination:<p>${element.destination}</p>  </div>
      <div id="box4" class="cbox">Pick-up Time: <p>${element.pickup_time}</p> </div>
      <div id="box5" class="cbox">Drop Time:<p>${element.drop_time}</p>  </div>
      <div id="box6" class="cbox">Price: <p>${element.price}</p> </div>
  </div>`);
    });
    if (post.length === 0) {
      $("#buses").append(`<p class="error">No Buses Found</p>`);
    }
  });
