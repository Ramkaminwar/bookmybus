const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  bus_number: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const handle_db = new mongoose.model("handle_db", schema);
module.exports = handle_db;
