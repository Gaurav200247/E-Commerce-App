const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("DB connected..."))
    .catch((error) => console.log("DB connection Failed !!", error));
};

module.exports = connectDB;
