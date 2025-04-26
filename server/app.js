const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

const database = require("./config/db");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const uploadRoute = require("./routes/upload");
const commentRoute = require("./routes/comment");
const cookieParser = require("cookie-parser");

const fileupload = require("express-fileupload");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

// Enable file upload middleware with temporary files
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

app.use("/api/v1/upload", uploadRoute);
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server in running on -> ");
  console.log(`http://localhost:${PORT}`);
});
