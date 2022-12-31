const express = require("express");
const news = express.Router();
const newsModel = require("../models/newsModel");
const jwtverify = require("../middleware/jwtVerfication");
const adminData = require("../models/adminModel");

news.post("/newsUpload", jwtverify, (req, res) => {
  var id = req.userid;
  var desc = req.body.desc;
  var link = req.body.link;
  adminData.findOne({ _id: id }, (err, result) => {
    if (err) res.status(400).json({ status: -1 });
    var d=new Date();
    var newsAdd = new newsModel({
      name: result.name,
      news: {
        desc: desc,
        link: link,
      },
      date: d.getDate(),
      month: d.getMonth(),
    });
    newsAdd.save((err, result) => {
      if (err) res.status(400).json({ status: -1 });
      res.status(200).json({ status: 0 });
    });
  });
});

news.post("/newsFetch", (req, res) => {
  newsModel.find({}, (err, result) => {
    if (err) res.status(400).json({ status: -1 });
    res.status(200).json({ status: 0, data: result });
  });
});

module.exports = news;
