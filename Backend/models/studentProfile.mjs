import mongoose from "mongoose";

const studProf = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  branch: String,
  roll: String,
  cgpa: String,
  phone: String,
  linkedin: String,
  github: String,
  profilePic: {
    data: Buffer,
    contentType: String,
  },
  resume: {
    data: Buffer,
    contentType: String,
  },
});

let studentProfile = mongoose.model("studentDetails", studProf);

export default studentProfile;
