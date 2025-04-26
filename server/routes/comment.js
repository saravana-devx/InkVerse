const express = require("express");
const { uploadComment, getCommentsByBlog } = require("../controllers/Comment");

const auth = require("../middlewares/Auth");

const router = express.Router();

router.post("/addComment/:slug", auth, uploadComment);
router.get("/:slug", getCommentsByBlog);

module.exports = router;
