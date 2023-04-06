const express = require("express");
const news = express.Router();
const newsModel = require("../models/newsModel");
const jwtverify = require("../middleware/jwtVerfication");
const adminData = require("../models/adminModel");

news.post("/newsUpload", jwtverify, async (req, res) => {
  var id = req.userid;
  var desc = req.body.desc;
  var link = req.body.link;
  await adminData
    .findOne({ _id: id })
    .then(async (result) => {
      var d = new Date();
      var newsAdd = new newsModel({
        name: result.name,
        news: {
          desc: desc,
          link: link,
        },
        date: d.getDate(),
        month: d.getMonth(),
      });
      await newsAdd
        .save()
        .then((result) => {
          if (err) res.status(400).json({ status: -1 });
          res.status(200).json({ status: 0 });
        })
        .catch((err) => {
          return res.status(400).json({ status: -1, error: err.message });
        });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

news.post("/newsFetch", async (req, res) => {
  await newsModel
    .find({})
    .then((result) => {
      return res.status(200).json({ status: 0, data: result });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

news.delete("/deleteNews", async (req, res) => {
  var newsId = req.body.id;
  await newsModel
    .deleteOne({ _id: newsId })
    .then((result) => {
      return res.status(200).json({ status: 0 });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

module.exports = news;
