const mongooose = require("mongoose");

var news = mongooose.Schema({
  name: String,
  news: {
    desc: String,
    link: String,
  },
  date: String,
  month: String,
});

module.exports = mongooose.model("newsDetails", news);
