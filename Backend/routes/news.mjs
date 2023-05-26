import express from "express";
const news = express.Router();
import newsModel from "../models/newsModel.mjs";
import jwtverify from "../middleware/jwtVerfication.mjs";
import adminModel from "../models/adminModel.mjs";

news.post("/newsUpload", jwtverify, async (req, res) => {
  var id = req.userid;
  var desc = req.body.desc;
  var link = req.body.link;
  await adminModel
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

export default news;
