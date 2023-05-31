const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  query: {
    type: String,
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
});

const user_db = new mongoose.model("user_db", schema);
module.exports = user_db;
