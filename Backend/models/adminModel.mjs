import mongoose from "mongoose";

var admin = mongoose.Schema({
  username: String,
  password: String,
  name: String,
  post: String,
});

let adminModel = mongoose.model("adminDetails", admin);

export default adminModel;
