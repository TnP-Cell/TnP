import mongoose from "mongoose";

var events = mongoose.Schema({
  name: String,
  events: {
    desc: String,
    link: String,
  },
  date: String,
  month: String,
});

let eventsModel = mongoose.model("eventsDetails", events);

export default eventsModel;
