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
  var MyJavaClass = Java.type("MyJavaClass");

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
    user_name: req.body.name,
    age: req.body.Age,
    phone_no: req.body.Phone_no,
    email: req.body.email,
  });
  data.save();
  res.send("You have Successfully Submited");
});

app.post("/Booke_ticket", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  const data = new transaction_db({
    user_name: req.body.name,
    age: req.body.Age,
    phone_no: req.body.Phone_no,
    email: req.body.email,
    ticket_no: req.body.ticket_no,
    source: req.body.source,
    destination: req.body.destination,
    date: req.body.date,
  });
  data.save();
  const body = `Your Ticket Details:\nSource=${req.body.source} to Destination=${req.body.destination} on date:=${req.body.date}`;
  sendmail(req.body.email, body);
  res.send("You have Successfully Submited");
});

app.post("*", function (req, res) {
  res.send("You have posted a wrong Request", 404);
});

app.listen(80, () => {
  console.log("Server listening on port 80");
});
