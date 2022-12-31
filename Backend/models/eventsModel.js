const mongoose = require("mongoose");

var events = mongoose.Schema({
  name: String,
  events: {
    desc: String,
    link: String,
  },
  date: String,
  month: String,
});

module.exports = mongoose.model("eventsDetails", events);
