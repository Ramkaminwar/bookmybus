const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone_no: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ticket_no: {
    type: Number,
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
  date: {
    type: String,
    required: true,
  },
});

const transaction_db = new mongoose.model("transactions", schema);
module.exports = transaction_db;
