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
  try {
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

    const body = `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ticket Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      position: relative;
    }
    
    h1 {
      background-color: #ff4d4d;
    }
    
    h2, h3 {
      background-color: #80ced6;
    }

    h1, h2, h3 {
      text-align: center;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f2f2f200;
    }

    .mail_format{
      border-left-style: dotted;
      border-right-style: dotted; 
      padding: 10px 15px;
      text-align: center;   
    }


.left {
  position: absolute;
  top: 20px;
  left: 55px;
  display: inline-block;
  text-align: center;
  Filter: invert(0);
}

.left img {
  width: 120px;
}

.left div {
  text-align: center;
}

.logos{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  opacity: 10;
  z-index: -1;
}

  </style>
</head>

<body>

  <h1>Ticket Confirmation</h1>
  <hr>

  <h2>Dear ${req.body.user_name},</h2>

  <p>Dear ${req.body.user_name},
  Thank you for choosing ${req.body.Agency} for your bus travel. We are delighted to provide you with the details of your upcoming trip.
</p>


  <h3>Passenger Details:</h3>
  <table>
    <tr>
      <th>Name:</th>
      <td>${req.body.user_name}</td>
    </tr>
    <tr>
      <th>Email:</th>
      <td>${req.body.email}</td>
    </tr>
    <tr>
      <th>Contact Number:</th>
      <td>${req.body.phone_no}</td>
    </tr>
  </table>

  <h3>Ticket Details:</h3>
  <table>

    <tr>
    <th>Ticket no</th>
      <th>Bus Agency</th>
      <th>Ticket Price</th>
      <th>Journey Date</th>
    </tr>
    <tr>
      <td>${req.body.ticket_no}</td>
      <td>${req.body.Agency}</td>
      <td>${req.body.price}</td>
      <td>${req.body.date}</td>
    </tr>

    <tr>
    <th class="mail_format" >Boarding Point</th>
      <th class="mail_format" >Boarding time</th>
    </tr>

    <tr>
    <td class="mail_format" >${req.body.source}</td>
      <td class="mail_format" >${req.body.pickup_time}</td>
    </tr>

    <tr>
    <th class="mail_format" >Dropping Point</th>
    <th class="mail_format" >Dropping time</th>
    </tr>
    <tr>
    <td class="mail_format" >${req.body.destination}</td>
      <td class="mail_format" >${req.body.drop_time}</td>
    </tr>

  </table>
<p>Please ensure that you have this confirmation email with you during your journey. If you have any questions or require further assistance, please do not hesitate to contact our customer support team.</p>
<p>
Thank you for choosing our services. We wish you a pleasant journey!</p>
  `;

    data.save();

    sendmail(req.body.email, body);
    res.send("ok");
  } catch (error) {
    console.log("hello");
    res.send("notok", 500);
  }
});

app.post("/Cancel_Ticket", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  console.log(req.body);
  let ticket = await transaction_db.findOne({
    ticket_no: req.body.ticket_no,
    user_name: req.body.user_name,
    phone_no: req.body.phone_no,
    email: req.body.email,
  });

  if (!ticket) {
    res.status(400).send("Wrong details");
  } else if (ticket.user_name === req.body.user_name) {
    console.log(ticket);
    res.send("You have Successfully Submited");

    const body = `Ticket is cancelled`
    sendmail(req.body.email, body);

  } else {
    res.send("You are not authorized to cancel this ticket");
  }
  await transaction_db.deleteOne({
    ticket_no: req.body.ticket_no,
    user_name: req.body.user_name,
    phone_no: req.body.phone_no,
    email: req.body.email,
  });



  

});

app.post("*", function (req, res) {
  res.status(404).send("You have posted a wrong Request");
});

app.listen(80, () => {
  console.log("Server listening on port 80");
});
