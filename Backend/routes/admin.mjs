import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwtverify from "../middleware/jwtVerfication.mjs";
import adminModel from "../models/adminModel.mjs";
import carouselImages from "../models/carouselImg.mjs";
import upload from "../middleware/fileUpload.mjs";
import jafModel from "../models/jafModel.mjs";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const admin = express.Router();

admin.post("/adminLogin", async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  await adminModel
    .findOne({ username: username })
    .then((result) => {
      if (result) {
        bcrypt.compare(password, result.password, (err, match) => {
          if (err) return res.status(400).json({ status: -1 });
          if (match) {
            var data = { id: result._id };
            var auth_token = jwt.sign(data, process.env.JWT_TOKEN);
            return res.status(200).json({ status: 0, auth_token });
          } else return res.status(401).json({ status: -1 });
        });
      } else return res.status(401).json({ status: -1 });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

admin.post("/adminShow",jwtverify, async (req, res) => {
  var id = req.userid;
  // console.log(id);
  await adminModel
    .findOne({ _id: id })
    .then((result) => {
      var data = {
        name: result.name,
        post: result.post,
      };
      return res.status(200).json({ status: 0, data });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1 });
    });
});

admin.post("/adminRegister", async (req, res) => {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var post = req.body.post;
  bcrypt.genSalt(10, (err, Salt) => {
    if (err) return res.status(400).json({ status: -1 });
    bcrypt.hash(password, Salt, async (err, hash) => {
      if (err) return res.status(400).json({ status: -1 });
      var adminData = new adminModel({
        name: name,
        username: username,
        password: hash,
        post: post,
      });
      await adminData
        .save()
        .then((result) => {
          res.status(200).json({ status: 0 });
        })
        .catch((err) => {
          return res.status(400).json({ status: -1, error: err.message });
        });
    });
  });
});

admin.post("/carouselShow", async (req, res) => {
  await carouselImages
    .find({})
    .then((result) => {
      var data = {
        images: result,
      };
      return res.status(200).json({ status: 0, data });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

admin.post(
  "/carouselUpload",
  upload.single("image"),
  jwtverify,
  async (req, res) => {
    var id = req.userid;
    await adminModel
      .findOne({ _id: id })
      .then(async (result) => {
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

        await data
          .save()
          .then((result) => {
            console.log("Image Uploaded");
            fs.unlinkSync(
              path.join(__dirname + "/uploads/" + req.file.filename)
            );
          })
          .catch((err) => {
            return res.status(400).json({ status: -1, error: err.message });
          });
        return res.status(200).json({ status: 0 });
      })
      .catch((err) => {
        return res.status(400).json({ status: -1, error: err.message });
      });
  }
);

admin.post("/jafRecruit", async (req, res) => {
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
  var branches = req.body.branches;
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
    branches: {
      bTech: branches,
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

  await data
    .save()
    .then(async (result) => {
      await fetch(``, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify(data),
        },
      })
        .then((res) => res.json())
        .then((data) => {
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

admin.post("/jafView", async (req, res) => {
  await jafModel
    .find({})
    .then((result) => {
      return res.json({ status: 0, data: result });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

export default admin;
