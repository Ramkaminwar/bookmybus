var express = require("express");
var app = express();
require("./db");
const handle_db = require("./handle_db");
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
  res.send("ram");
});

app.get("/city_list", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  handle_db.find();
  // It Will return number of cities
  res.json("nanded");
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
