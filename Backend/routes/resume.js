const express = require("express");
const path = require("path");
const fs = require("fs");
const resume = express.Router();
const Resume = require("../models/resumeModel");
const upload = require("../middleware/fileUpload");

resume.get("/resumeShow/:email", (req, res) => {
  var email = req.params.email;
  Resume.findOne({ email: email }, (err, result) => {
    if (err) throw err;
    res.render("resume-builder.ejs", { result: result, check: true });
  });
});

resume.post("/resumeAdd", upload.single("image"), async (req, res) => {
  var { name, email, phone, course, cgpa } = req.body;
  var newResume = new Resume({
    name: name,
    email: email,
    mobile: phone,
    course: course,
    cgpa: cgpa,
    image: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "png",
    },
  });
  await newResume.save((err, result) => {
    if (err) throw err;
    console.log("Resume Added");
    fs.unlinkSync(path.join(__dirname + "/uploads/" + req.file.filename));
  });
  res.redirect("/resumeShow/" + email);
});

resume.post("/resumeAcad/:email", (req, res) => {
  var { course, institute, score, year } = req.body;
  var email = req.params.email;
  Resume.findOneAndUpdate(
    { email: email },
    {
      $push: {
        academic: {
          course: course,
          institute: institute,
          score: score,
          year: year,
        },
      },
    },
    (err, result) => {
      if (err) throw err;
      console.log("Academic Details Added");
    }
  );
  res.redirect("/resumeShow/" + email);
});

resume.post("/resumeSubjects/:email", (req, res) => {
  var { subject } = req.body;
  var email = req.params.email;
  Resume.findOneAndUpdate(
    { email: email },
    {
      $push: {
        subjects: subject,
      },
    },
    (err, result) => {
      if (err) throw err;
      console.log("Subjects Added");
    }
  );
  res.redirect("/resumeShow/" + email);
});

resume.post("/resumeSkills/:email", (req, res) => {
  var skill = req.body.skills;
  var email = req.params.email;
  Resume.findOneAndUpdate(
    { email: email },
    {
      $push: {
        skills: skill,
      },
    },
    (err, result) => {
      if (err) throw err;
      console.log("Skills Added");
    }
  );
  res.redirect("/resumeShow/" + email);
});

resume.post("/resumeExperience/:email", (req, res) => {
    var { title, desc, duration } = req.body;
    var email = req.params.email;
    Resume.findOneAndUpdate(
      { email: email },
      {
        $push: {
            experience: {
                title: title,
                desc: desc,
                duration: duration,
            }
        },
      },
      (err, result) => {
        if (err) throw err;
        console.log("Experience Added");
      }
    );
    res.redirect("/resumeShow/" + email);
  });

module.exports = resume;
