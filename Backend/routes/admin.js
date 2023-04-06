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
const transporter = require("../middleware/nodeMailer");

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

admin.post("/adminShow", jwtverify, async (req, res) => {
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
    .then((result) => {
      sender(data);
      return res.status(200).json({ status: 0 });
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

const sender = (data) => {
  let mailOptions = {
    from: process.env.USER,
    to: "tpo@iiitbh.ac.in, tnp_fic@iiitbh.ac.in",
    bcc: "prateek.ece.20035@iiitbh.ac.in, prem.cse.20011@iiitbh.ac.in",
    subject: "Test Mail for JAF",
    html: `<div
    style="
      text-align: center;
      border: 2px solid rgb(239, 200, 25);
      color: rgb(239, 200, 25);
      border-radius: 20px;
      margin: 2% 5%;
    "
  >
    <h1>Training and Placement Cell JAF Form</h1>
  </div>
  <div
    style="
      border: 2px solid rgb(239, 200, 25);
      border-radius: 20px;
      margin-top: 2%;
      padding: 3%;
      margin: 0% 5%;
    "
  >
    <h3 style="text-decoration: underline; text-align: center;">1. General Information</h3>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 0 20px 0 20px"><b>Name of Organization:</b> <span>${
        data.orgName
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Website:</b> <a href="${
        data.website
      }">${data.website}</a></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Location:</b> <span>${
        data.postalAddress
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Category:</b> <span>${
        data.category
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Industry Sector:</b> <span>${
        data.industrySector
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>About Company:</b> <span>${
        data.aboutOrg
      }</span></p>    
    </div>
    <h3 style="text-decoration: underline; text-align: center;">2.a Contact Details: Head HR</h3>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b></b>Name of Head HR:</b> <span>${
        data.contact.headHR.name
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b></b>Phone:</b> <a href="tel:${
        data.contact.headHR.mobile
      }"
          >${data.contact.headHR.mobile}</a
        ></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Email:</b> <a href="mailto:${
        data.contact.headHR.email
      }"
          >${data.contact.headHR.email}</a
        ></p>
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Landline:</b> <a href="tel:${
        data.contact.headHR.landline
      }"
          >${data.contact.headHR.landline}</a
        ></p>    
    </div>
    <h3 style="text-decoration: underline; text-align: center;">
      2.b Contact Details: First Contact Person
    </h3>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Name of First Contact Person:</b> <span>${
        data.contact.firstContactPerson.name
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Phone:</b> <a href="tel:${
        data.contact.firstContactPerson.mobile
      }"
          >${data.contact.firstContactPerson.mobile}</a
        ></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Email:</b> <a href="mailto:${
        data.contact.firstContactPerson.email
      }"
          >${data.contact.firstContactPerson.email}</a
        ></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Landline:</b> <a href="tel:${
        data.contact.firstContactPerson.landline
      }"
          >${data.contact.firstContactPerson.landline}</a
        ></p>    
    </div>
    <h3 style="text-decoration: underline; text-align: center;">3. Job Profile Details</h3>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Job Offer Type:</b> <span>${
        data.jobProfile.jobOffer
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Selection Type:</b> <span>${
        data.jobProfile.selectionProcess
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Eligible Batches:</b> <span>${showList(
        data.jobProfile.eligibleBatches
      )}</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Eligible Branches:</b> <span>${showList(
        data.branches.bTech
      )}</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Job Designation:</b> <span>${
        data.bTech.jobDesignation
      }</span></p>   
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Place of Posting:</b> <span>${
        data.bTech.jobLocation
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Job Description / Summary:</b> <span>${
        data.bTech.jobDescription
      }</span></p>    
    </div>
    <h3 style="text-decoration: underline; text-align: center;">4. Salary Details</h3>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Remuneration for Internship:</b> <span>${
        data.salary.renumeration
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Cost to Co. (CTC):</b> <span>${
        data.bTech.CTC
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Gross:</b> <span>${
        data.bTech.gross
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Take-Home:</b> <span>${
        data.bTech.takeHome
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Bonus/Perks/Incentives:</b> <span>${
        data.bTech.bonus
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Re-Location:</b> <span>${
        data.bTech.relocationBonus
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Bond or Contract (Specify details if any):</b> <span>${
        data.bTech.contract
      }</span></p>    
    </div>
    <h3 style="text-decoration: underline; text-align: center;">5. Process</h3>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Mode of Selection:</b> <span>${showList(
        data.programs.bTech
      )}</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Number of Rounds:</b> <span>${
        data.selectionProcess.rounds
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Eligibility Criteria (CPI cutoff on a scale of 0-10):</b> <span>${
        data.selectionProcess.eligibility
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Preferred Period of Visit for Recruitment:</b> <span>${
        data.selectionProcess.sppov
      }</p></p>    
    </div>
    <h3 style="text-decoration: underline; text-align: center;">6. Preferance & Requirements</h3>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Preferred Location:</b> <span>${
        data.selectionProcess.preferredLocation
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Number of offers (expected):</b> <span>${
        data.selectionProcess.offers
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Number of members visiting IIIT Bhagalpur campus:</b> <span>${
        data.logisticalDetails.members
      }</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>No. of rooms & Days required for the selection process:</b> <span>${
        data.logisticalDetails.rooms
      }, ${data.logisticalDetails.days}</span></p>    
    </div>
    <div
      style="
        width: 80vw;
        margin: 0.1%;
        padding: 0;
      "
    >
      <p style="margin: 10px 20px 10px 20px"><b>Other requirements if any:</b> <span>${
        data.otherRequirements
      }</span></p>    
    </div>
  </div>
  `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log("Message sent: %s", info.messageId);
  });
};

const showList = (data) => {
  var x = "";
  for (var i = 0; i < data.length; i++) {
    if (i < data.length - 1) x += data[i] + ", ";
    else x += data[i];
  }
  return x;
};

module.exports = admin;
