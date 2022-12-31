const mongoose = require("mongoose");

var resume = mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
  name: String,
  email: String,
  course: String,
  mobile: String,
  cgpa: String,
  academic: [{
    course: String,
    institute: String,
    board: String,
    score: String,
    year: String,
  }],
  subjects: [String],
  skills: [String],
  experience: [{
    title: String,
    desc: String,
    duration: String,
  }],
  projects: [{
    title: String,
    desc: String,
    duration: String,
  }],
  resp: [{
    title: String,
    desc: String,
    duration: String,
  }],
  exCurr: [{
    title: String,
    desc: String,
  }],
  confrences: [{
    title: String,
    org: String,
    desc: String,
  }],
  languages: [String],
});

module.exports = mongoose.model("Resume-Builder", resume);
