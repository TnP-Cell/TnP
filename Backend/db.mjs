import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// database url
// const url = "mongodb://localhost:27017/tnp";
const url = process.env.DB_URL;

// database connection to our node server
const connect = async () => {
  try {
    await mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database Connected");
      });
  } catch (error) {
    console.log("Database is not connected");
  }
};

export default connect;
