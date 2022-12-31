const express = require("express");
// var https = require("https");
var fs = require("fs");
require("dotenv").config();
const bodyParser = require("body-parser");
const connect = require("./backend/db");
const cors = require("cors");
const app = express();
connect();

app.set('views', './views');
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/", require("./routes/pages"));
// app.get("/tnp", (req, res) => {
//   res.render("index");
// });
app.use("/", require("./backend/routes/pages"));
app.use("/api", require("./backend/routes/profile"));
app.use("/api/admin", require("./backend/routes/admin"));
app.use("/api/news", require("./backend/routes/news"));
app.use("/api/events", require("./backend/routes/events"));
// app.use("/api", require("./routes/resume"));

var options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert")
};

var port = process.env.PORT || 5000;
app.listen(port, process.env.IP, () => {
  console.log("Server is running at port: " + port);
});
// https.createServer(options, app).listen(port, () => {
//   console.log("Server is running at port: " + port);
// });
