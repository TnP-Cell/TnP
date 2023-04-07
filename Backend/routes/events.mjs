import express from "express";
const events = express.Router();
import eventsModel from "../models/eventsModel.mjs";
import jwtverify from "../middleware/jwtVerfication.mjs";
import adminModel from "../models/adminModel.mjs";

events.post("/eventsUpload", jwtverify, async (req, res) => {
  var id = req.userid;
  var desc = req.body.desc;
  var link = req.body.link;
  await adminModel
    .findOne({ _id: id })
    .then(async (result) => {
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
      await eventsAdd
        .save()
        .then((result) => {
          return res.status(200).json({ status: 0 });
        })
        .catch((err) => {
          return res.status(400).json({ status: -1, error: err.message });
        });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

events.post("/eventsFetch", async (req, res) => {
  await eventsModel
    .find({})
    .then((result) => {
      res.status(200).json({ status: 0, data: result });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

events.delete("/deleteEvents", async (req, res) => {
  var eventsId = req.body.id;
  await eventsModel
    .deleteOne({ _id: eventsId })
    .then((result) => {
      return res.status(200).json({ status: 0 });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

export default events;
