import mongoose from "mongoose";

var news = mongoose.Schema({
  name: String,
  news: {
    desc: String,
    link: String,
  },
  date: String,
  month: String,
});

let newsModel = mongoose.model("newsDetails", news);

export default newsModel;
