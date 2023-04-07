import express from "express";
const page = express.Router();

page.get("/", (req, res) => {
  res.render("index");
});

page.get("/:page", (req, res) => {
  var page = req.params.page;
  if (page == "institute") res.render("institute-page");
  else if (page == "profile") res.render("login-page");
  else if (page == "contact") res.render("contact-page");
  else if (page == "visitors") res.render("visitors");
  else if (page == "forRecruiters") res.render("for-recruiters");
  else if (page == "contactPage") res.render("contact-page");
  else if (page == "directorPage") res.render("director-page");
  else if (page == "admin") res.render("admin-login");
  else if (page == "stats") res.render("stats");
  else if (page == "gallery") res.render("gallery");
  else if (page == "aDashboard") res.render("admin-panel");
  else if (page == "dashboard") res.render("student-page");
  else if (page == "faq") res.render("faq");
  else if (page == "jaf") res.render("jaf");
  else if (page == "resume") res.render("resume-builder", { check: false });
});

export default page;
