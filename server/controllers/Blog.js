const Blog = require("../models/blog");
const User = require("../models/user");
const slugify = require("slugify");

function mySlug(title) {
  const slug = slugify(title, {
    lower: true,
    remove: /[*+~.()'"!:@?]/g,
  });

  const uniqueString = Math.random().toString(36).substring(2, 10); // Generate a random 8-character string

  return slug.slice(0, 50 - uniqueString.length) + "-" + uniqueString; // Limit the total length to 50 characters
}

exports.uploadBlog = async (req, res) => {
  try {
    const { thumbnail, title, content, tags, description } = req.body;
    const userId = req.user.id;

    if (!thumbnail || !title || tags.length === 0 || !content || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required details: thumbnail, title, tags, content, and description.",
      });
    }

    const slug = mySlug(title);
    const blog = await Blog.create({
      author: userId,
      thumbnail,
      title,
      description,
      slug,
      tags,
      content,
    });

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          blogs: { _id: blog._id },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Blog created Successfully",
      blog,
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid server error",
      error: error.message,
    });
  }
};

exports.editBlog = async (req, res) => {
  try {
    const { thumbnail, title, content, tags, description } = req.body;
    const { blogId } = req.params;
    if (!blogId) {
      return res.status(404).json({
        success: false,
        message: "blog Id is not present",
      });
    }
    if (!thumbnail || !title || tags.length === 0 || !content || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required details: thumbnail, title, tags, content, and description.",
      });
    }

    const slug = mySlug(title);
    const editedBlog = await Blog.findOneAndUpdate(
      { _id: blogId },
      {
        $set: {
          thumbnail,
          title,
          content,
          tags,
          description,
          slug,
        },
      },
      { new: true }
    );
    if (!editedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Blog edited Successfully",
      editedBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid server error",
      error: error.message,
    });
  }
};

exports.getLatestBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ updatedAt: -1 })
      .limit(6)
      .populate("author", "firstName lastName ")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All latest Blogs ",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid server error",
      error: error.message,
    });
  }
};

exports.getTrendingBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ totalViews: -1 }).limit(6);

    return res.status(200).json({
      success: true,
      message: "Trending Blogs fetched",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid server Error",
      error: error.message,
    });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Fetch and update view count in one query
    const blog = await Blog.findOneAndUpdate(
      { slug: slug },
      { $inc: { totalViews: 1 } },
      { new: true } // Return updated document
    ).populate("author", "firstName lastName image");

    // Handle case where no blog is found
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
exports.getBlogByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogs = await Blog.find({ author: userId });

    if (!blogs) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const totalBlogs = blogs.length;
    const totalViews = blogs.reduce((acc, blog) => acc + blog.totalViews, 0);
    const totalLikes = blogs.reduce((acc, blog) => acc + blog.like, 0);
    return res.status(200).json({
      success: true,
      message: "Blogs of user",
      blogs,
      totalBlogs,
      totalViews,
      totalLikes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error...",
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogId = req.params.blogId;
    const user = await User.findById(userId);
    // console.log("blogId to delete -> ", blogId);
    if (!user.blogs.includes(blogId)) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    user.blogs = user.blogs.filter((blog) => blog.toString() !== blogId);
    await user.save();
    await Blog.findByIdAndDelete(blogId);
    
    return res.status(200).json({
      success: true,
      message: "Blog deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error...",
      error: error.message,
    });
  }
};

exports.getPaginationDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
    const results = {};
    results.blogs = await Blog.find().limit(limit).skip(startIndex).exec();
    results.totalDocument = await Blog.countDocuments().exec();

    return res.status(200).json({
      success: true,
      message: `blogs`,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error...",
      error: error.message,
    });
  }
};

exports.getSearchResults = async (req, res) => {
  try {
    const { query } = req.params;
    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Provide query for search result",
      });
    }
    const searchResults = await Blog.find({
      $or: [{ title: { $regex: query, $options: "i" } }],
    });

    return res.status(200).json({
      success: true,
      message: "search Results fetched...",
      searchResults,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error...",
      error: error.message,
    });
  }
};
