const mongoose = require("mongoose");

// database url
// const url = "mongodb://localhost:27017/tnp";
const url = process.env.DB_URL;

// database connection to our node server
const connect = async () => {
  try {
    await mongoose.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        console.log("DataBase Connected");
      }
    );
  } catch (error) {
    console.log("Data Base is not connected");
  }
};

module.exports = connect;
