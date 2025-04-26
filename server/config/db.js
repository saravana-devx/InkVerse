const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const db = mongoose
  .connect(process.env.DATABASE_URL, {})
  .then(() => {
    console.log("DATABASE connected Successfully..");
  })
  .catch((error) => {
    console.log("Error occur while connecting to Database");
    console.error("message : ", error.message);
  });

