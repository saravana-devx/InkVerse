const Comment = require("../models/comment");
const Blog = require("../models/blog");

exports.uploadComment = async (req, res) => {
  try {
    const { commentDescription } = req.body;
    const userId = req.user.id;
    const { slug } = req.params;
    if (!commentDescription) {
      return res.status(404).json({
        success: false,
        message: "Comment is not provided",
      });
    }

    const comment = await Comment.create({
      commentDescription,
      user: userId,
    });

    const blog = await Blog.findOneAndUpdate(
      { slug: slug },
      {
        $push: {
          comments: comment.id,
        },
      }
      // { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Comments fetched by Id",
      comment,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid server error",
      error: error.message,
    });
  }
};
exports.getCommentsByBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const s = slug;
    const commentFromBlog = await Blog.findOne({ slug: s }).populate({
      path: "comments",
      populate: {
        path: "user",
        select: "firstName lastName image",
      },
    });
    if (!commentFromBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Comments fetched by Ids",
      comments: commentFromBlog.comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
