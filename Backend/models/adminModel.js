const mongoose = require("mongoose");

var admin = mongoose.Schema({
  username: String,
  password: String,
  name: String,
  post: String,
});

module.exports = mongoose.model("adminDetails", admin);
