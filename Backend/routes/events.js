const express = require("express");
const events = express.Router();
const eventsModel = require("../models/eventsModel");
const jwtverify = require("../middleware/jwtVerfication");
const adminModel = require("../models/adminModel");

events.post("/eventsUpload", jwtverify, (req, res) => {
  var id = req.userid;
  var desc = req.body.desc;
  var link = req.body.link;
  adminModel.findOne({ _id: id }, (err, result) => {
    if (err) res.status(400).json({ status: -1 });
    var d = new Date();
    var eventsAdd = new eventsModel({
      name: result.name,
      events: {
        desc: desc,
        link: link,
      },
      date: d.getDate(),
      month: d.getMonth(),
    });
    eventsAdd.save((err, result) => {
      if (err) res.status(400).json({ status: -1 });
      res.status(200).json({ status: 0 });
    });
  });
});

events.post("/eventsFetch", (req, res) => {
  eventsModel.find({}, (err, result) => {
    if (err) res.status(400).json({ status: -1 });
    res.status(200).json({ status: 0, data: result });
  });
});

module.exports = events;
