import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import connect from "./backend/db.mjs";
import cors from "cors";
import admin from "./backend/routes/admin.mjs";
import page from "./backend/routes/pages.mjs";
import news from "./backend/routes/news.mjs";
import events from "./backend/routes/events.mjs";
const app = express();
connect();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", page);
// app.use("/api", require("./backend/routes/profile"));
app.use("/api/admin", admin);
app.use("/api/news", news);
app.use("/api/events", events);
// app.use("/api", require("./routes/resume"));

var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running at port: " + port);
});
