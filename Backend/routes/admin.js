const express = require("express");
const admin = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtverify = require("../middleware/jwtVerfication");
const adminModel = require("../models/adminModel");
const carouselImages = require("../models/carouselImg");
const upload = require("../middleware/fileUpload");
const path = require("path");
const fs = require("fs");

admin.post("/adminLogin", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  adminModel.findOne({ username: username }, (err, result) => {
    if (err) res.status(400).json({ status: -1 });
    if (result) {
      bcrypt.compare(password, result.password, (err, match) => {
        if (err) res.status(400).json({ status: -1 });
        if (match) {
          var data = { id: result._id };
          var auth_token = jwt.sign(data, process.env.JWT_TOKEN);
          res.status(200).json({ status: 0, auth_token });
        } else res.status(400).json({ status: -1 });
      });
    } else res.status(400).json({ status: -1 });
  });
});

admin.post("/adminShow", jwtverify, (req, res) => {
  var id = req.userid;
  // console.log(id);
  adminModel.findOne({ _id: id }, (err, result) => {
    if (err) res.status(400).json({ status: -1 });
    var data = {
      name: result.name,
      post: result.post,
    };
    res.status(200).json({ status: 0, data });
  });
});

admin.post("/adminRegister", (req, res) => {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var post = req.body.post;
  bcrypt.genSalt(10, (err, Salt) => {
    if (err) res.status(400).json({ status: -1 });
    bcrypt.hash(password, Salt, (err, hash) => {
      if (err) res.status(400).json({ status: -1 });
      var adminData = new adminModel({
        name: name,
        username: username,
        password: hash,
        post: post,
      });
      adminData.save((err, result) => {
        if (err) res.status(400).json({ status: -1 });
        res.status(200).json({ status: 0 });
      });
    });
  });
});

admin.post("/carouselShow", (req, res) => {
  carouselImages.find({}, (err, result) => {
    if (err) res.status(400).json({ status: -1 });
    var data = {
      images: result,
    };
    res.status(200).json({ status: 0, data });
  });
});

admin.post("/carouselUpload", upload.single("image"), jwtverify, (req, res) => {
  var id = req.userid;
  adminModel.findOne({ _id: id }, (err, result) => {
    if (err) res.status(403).json({ status: -1 });
    var data = new carouselImages({
      name: result.name,
      post: result.post,
      img: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.filename)
        ),
        contentType: "image/jpeg",
      },
    });

    data.save((err, result) => {
      if (err) res.status(400).json({ status: -1 });
      console.log("Image Uploaded");
      fs.unlinkSync(path.join(__dirname + "/uploads/" + req.file.filename));
    });
    res.status(200).json({ status: 0 });
  });
});

module.exports = admin;
