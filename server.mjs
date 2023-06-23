import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import connect from "./Backend/db.mjs";
import cors from "cors";
import admin from "./Backend/routes/admin.mjs";
import page from "./Backend/routes/pages.mjs";
import news from "./Backend/routes/news.mjs";
import events from "./Backend/routes/events.mjs";
import profile from "./Backend/routes/profile.mjs";
const app = express();
connect();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", page);
app.use("/api", profile);
app.use("/api/admin", admin);
app.use("/api/news", news);
app.use("/api/events", events);
// app.use("/api", require("./routes/resume"));

var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running at port: " + port);
});
