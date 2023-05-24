const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  city_name: {
    type: String,
    required: true,
  },
});

const city_db = new mongoose.model("city_db", schema);
module.exports = city_db;
