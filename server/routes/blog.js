const express = require("express");
const auth = require("../middlewares/Auth");
const {
  uploadBlog,
  getLatestBlogs,
  getTrendingBlogs,
  getBlogByUser,
  deleteBlog,
  getPaginationDetails,
  getSearchResults,
  editBlog,
  getBlogBySlug,
} = require("../controllers/Blog");

const router = express.Router();

router.get("/latest", getLatestBlogs);
router.get("/trending", getTrendingBlogs);
router.get("/blogId/:slug", getBlogBySlug);
router.get("/pageDetails", getPaginationDetails);
router.get("/searchResults/:query", getSearchResults);

router.post("/uploadBlog", auth, uploadBlog);
router.put("/editBlog/:blogId", editBlog);
router.post("/deleteBlog/:blogId", auth, deleteBlog);

router.get("/userBlogs", auth, getBlogByUser);

module.exports = router;
