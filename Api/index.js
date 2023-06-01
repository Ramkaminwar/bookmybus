var express = require("express");
var app = express();
require("./db");
const schedule_db = require("./schedule_db");
const city_db = require("./city_db");
const bodyParser = require("body-parser");
const user_db = require("./user_db");
const transaction_db = require("./transcations_db");
const sendmail = require("./send_Confirmation");
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.get("/", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  res.send(calcInstance);
});

app.get("/city_list", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  // It Will return number of cities
  var data = await city_db.distinct("city_name");
  res.json(data);
});

app.get("/search_bus", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  var query = require("url").parse(req.url, true).query;
  const sourceVariable = query.source;
  const destinationVariable = query.desti;
  var data = await schedule_db.find({
    source: sourceVariable,
    destination: destinationVariable,
  });
  console.log(data);
  res.json(data);
});

app.get("/Search-Ticket", async function (req, res) {
  var query = require("url").parse(req.url, true).query;
  console.log(query.source);

  res.json(query);
});

app.post("/savedata", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  const data = new user_db({
    user_name: req.body.user_name,
    query: req.body.query,
    phone_no: req.body.phone_no,
    email: req.body.email,
  });
  data.save();
  res.send("You have Successfully Submited");
});

app.post("/Booke_ticket", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  const data = new transaction_db({
    user_name: req.body.user_name,
    phone_no: req.body.phone_no,
    email: req.body.email,
    ticket_no: req.body.ticket_no,
    source: req.body.source,
    destination: req.body.destination,
    date: req.body.date,
    Agency: req.body.Agency,
    pickup_time: req.body.pickup_time,
    drop_time: req.body.drop_time,
    price: req.body.price,
  });
  data.save();
  
  const body = `
  
  Safar
  Dear ${req.body.user_name},
  Thank you for choosing ${req.body.Agency} for your bus travel. We are delighted to provide you with the details of your upcoming trip.


  Please find the following information regarding your ticket:

\tAgency Name: ${req.body.Agency}
\tTicket Number: ${req.body.ticket_no}

Bus Details:
\n\tDeparture Date: ${req.body.date}
\n\tDeparture Time: ${req.body.pickup_time}
\n\tDeparture Point: ${req.body.source}
\n\tArrival Date: ${req.body.date}
\n\tArrival Time: ${req.body.drop_time}
\n\tArrival Point: ${req.body.destination}

Passenger Details:
\n\tPassenger Name: ${req.body.user_name}
\n\tContact Number: ${req.body.phone_no}
\n\tEmail Address: ${req.body.email}

Please note that it is essential to arrive at the departure point at least 30 Minutes before the scheduled departure time. 
Kindly carry your valid identification documents and this ticket with you for smooth boarding procedures.

In case of any changes or queries regarding your travel arrangements, please feel free to contact our customer service team. We are available 24*7.

We wish you a pleasant journey and hope you have a wonderful travel experience with us. Thank you for choosing ${req.body.Agency}, Safar .

Best regards,
\tSafar
\t${req.body.Agency}`;

  sendmail(req.body.email, body);
  res.send("ok");
});

app.post("*", function (req, res) {
  res.send("You have posted a wrong Request", 404);
});

app.listen(80, () => {
  console.log("Server listening on port 80");
});