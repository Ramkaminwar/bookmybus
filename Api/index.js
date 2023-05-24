var express = require("express");
var app = express();
require("./db");
const schedule_db = require("./schedule_db");
const city_db = require("./city_db");
const bodyParser = require("body-parser");
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
  var data = new schedule_db({
    bus_number: "80",
    source: "Nanded",
    destination: "Mumbai",
    time: "2pm",
    price: 2000,
  });
  data.save(data);

  res.send("ram");
});

app.get("/city_list", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  // It Will return number of cities
  var data = await city_db.distinct("city_name");
  console.log(data);
  res.json(data);
});

app.get("/getData", async function (req, res) {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader("Access-Control-Allow-Methods", "GET");
  var query = require("url").parse(req.url, true).query;

  console.log(query);

  res.json(query);
});

app.get("/Search-Ticket", async function (req, res) {
  var query = require("url").parse(req.url, true).query;
  console.log(query.source);

  res.json(query);
});

app.post("*", function (req, res) {
  res.send("You have posted a wrong Request", 404);
});

app.listen(80, () => {
  console.log("Server listening on port 80");
});
