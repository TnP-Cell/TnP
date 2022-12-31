const mongoose = require("mongoose");

const studProf = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  branch: String,
  roll: String,
  cgpa: String,
  phone: String,
  linkedin: String,
  github: String,
  profilePic: {
    data: Buffer,
    contentType: String,
  },
  resume: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("studentDetails", studProf);
