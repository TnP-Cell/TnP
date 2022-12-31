const mongoose = require("mongoose");

const images = mongoose.Schema({
  name: String,
  post: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("carouselImages", images);
