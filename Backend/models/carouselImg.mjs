import mongoose from "mongoose";

const images = mongoose.Schema({
  name: String,
  post: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

let carouselImages = mongoose.model("carouselImages", images);

export default carouselImages;
