const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  Agency: {
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
  pickup_time: {
    type: String,
    required: true,
  },
  drop_time: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  user_name:{
    type: String,
    required: true,
  },
});

const schedule_db = new mongoose.model("schedule_db", schema);
module.exports = schedule_db;
