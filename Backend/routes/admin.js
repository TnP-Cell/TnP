const express = require("express");
const admin = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtverify = require("../middleware/jwtVerfication");
const adminModel = require("../models/adminModel");
const carouselImages = require("../models/carouselImg");
const upload = require("../middleware/fileUpload");
const jafModel = require("../models/jafModel");
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

admin.post("/jafRecruit", (req, res) => {
  var date = new Date();
  var dof =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  var orgName = req.body.orgName;
  var website = req.body.website;
  var postalAddress = req.body.postalAddress;
  var category = req.body.category;
  var industrySector = req.body.industrySector;
  var aboutOrg = req.body.aboutOrg;
  var hhname = req.body.hhname;
  var hhmobile = req.body.hhmobile;
  var hhemail = req.body.hhemail;
  var hhlandline = req.body.hhlandline;
  var fcpname = req.body.fcpname;
  var fcpmobile = req.body.fcpmobile;
  var fcpemail = req.body.fcpemail;
  var fcplandline = req.body.fcplandline;
  var jobOffer = req.body.jobOffer;
  var selectionProcess = req.body.selectionProcess;
  var eligibility = req.body.eligibility;
  var programs = req.body.programs;
  var jobDesignation = req.body.jobDesignation;
  var jobLocation = req.body.jobLocation;
  var jobDescription = req.body.jobDescription;
  var renumeration = req.body.renumeration;
  var ctc = req.body.ctc;
  var gross = req.body.gross;
  var takeHome = req.body.takeHome;
  var bonus = req.body.bonus;
  var relocationBonus = req.body.relocationBonus;
  var contract = req.body.contract;
  var spmode = req.body.spmode;
  var sprounds = req.body.sprounds;
  var speligibility = req.body.speligibility;
  var sppov = req.body.sppov;
  var preferredLocation = req.body.preferredLocation;
  var offers = req.body.offers;
  var ldmembers = req.body.ldmembers;
  var ldrooms = req.body.ldrooms;
  var otherRequirements = req.body.otherRequirements;

  var data = new jafModel({
    dof: dof,
    orgName: orgName,
    website: website,
    aboutOrg: aboutOrg,
    postalAddress: postalAddress,
    category: category,
    industrySector: industrySector,
    contact: {
      headHR: {
        name: hhname,
        mobile: hhmobile,
        email: hhemail,
        landline: hhlandline,
      },
      firstContactPerson: {
        name: fcpname,
        mobile: fcpmobile,
        email: fcpemail,
        landline: fcplandline,
      },
    },
    jobProfile: {
      jobOffer: jobOffer,
      selectionProcess: selectionProcess,
      eligibleBatches: eligibility,
    },
    programs: {
      bTech: programs,
    },
    bTech: {
      jobDesignation: jobDesignation,
      jobLocation: jobLocation,
      jobDescription: jobDescription,
      CTC: ctc,
      gross: gross,
      takeHome: takeHome,
      bonus: bonus,
      relocationBonus: relocationBonus,
      contract: contract,
    },
    salary: {
      renumeration: renumeration,
    },
    selectionProcess: {
      mode: spmode,
      rounds: sprounds,
      eligibility: speligibility,
      pov: sppov,
      preferredLocation: preferredLocation,
      offers: offers,
    },
    logisticalDetails: {
      members: ldmembers,
      rooms: ldrooms,
    },
    otherRequirements: otherRequirements,
  });

  data.save((err,result)=>{
    if(err) return res.status(400).json({status:-1});
    res.status(200).json({status:0});
  })
});

module.exports = admin;
