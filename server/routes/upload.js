const express = require("express");
const { imageUpload } = require("../controllers/fileUpload");
const router = express.Router();

router.post("/image", imageUpload);

module.exports = router;
