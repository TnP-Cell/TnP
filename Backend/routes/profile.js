const express = require("express");
const fs = require("fs");
const path = require("path");
const profile = express.Router();
const studProf = require("../models/studentProfile");
const jwt = require("jsonwebtoken");
const jwtverify = require("../middleware/jwtVerfication");
const upload = require("../middleware/fileUpload");

profile.post("/login", async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  await studProf
    .findOne({ email: username })
    .then((result) => {
      if (result.password === password) {
        var data = { id: result._id };
        var auth_token = jwt.sign(data, process.env.JWT_TOKEN);
        return res.status(200).json({ status: 0, auth_token });
      } else return res.status(401).json({ status: -1 });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

profile.post("/showProfile", jwtverify, async (req, res) => {
  var id = req.userid;
  // console.log(id)
  await studProf
    .findOne({ _id: id })
    .then((result) => {
      var data = {
        email: result.email,
        name: result.name,
        branch: result.branch,
        roll: result.roll,
        cgpa: result.cgpa,
        phone: result.phone,
        linkeidn: result.linkedin,
        github: result.github,
        profilePic: result.profilePic,
        resume: result.resume,
      };
      return res.status(200).json({ status: 0, data });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
  // res.status(400).json({ status: -1 });
});

var multiUpload = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePic", maxCount: 1 },
]);

profile.post("/register", multiUpload, async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var branch = req.body.branch;
  var roll = req.body.roll;
  var cgpa = req.body.cgpa;
  var phone = req.body.phone;
  var linkedin = req.body.linkedin;
  var github = req.body.github;

  // console.log(req.files.profilePic[0].filename);
  // console.log(req.files.resume[0].filename);

  var prof = new studProf({
    name: name,
    email: email,
    password: password,
    branch: branch,
    roll: roll,
    cgpa: cgpa,
    phone: phone,
    linkedin: linkedin,
    github: github,
    profilePic: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.files.profilePic[0].filename)
      ),
      contentType: "images/png",
    },
    resume: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.files.resume[0].filename)
      ),
      contentType: "pdf",
    },
  });

  await prof
    .save()
    .then((result) => {
      console.log("Profile Uploaded");
      fs.unlinkSync(
        path.join(__dirname + "/uploads/" + req.files.profilePic[0].filename)
      );
      fs.unlinkSync(
        path.join(__dirname + "/uploads/" + req.files.resume[0].filename)
      );
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
  return res.status(200).json({ status: 0 });
});

module.exports = profile;
