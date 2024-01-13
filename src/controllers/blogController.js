const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");

// Create a new blog post
const createBlog = asyncHandler(async (req, res) => {
  if (req.file && req.file.filename) {
    req.body.image = `blogs/${req.file.filename}`;
  }
  const { title } = req.body;
  console.log(title);
  const existingBlog = await Blog.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (existingBlog) {
    return res
      .status(409)
      .json({ message: "Blog with the same title already exists" });
  }

  const newBlog = await Blog.create(req.body);
  res.status(201).json({ status: "success", data: newBlog });
});

// Get all blog posts
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.status(200).json({ status: "success", data: blogs });
});

// Get a blog post by ID
const getBlogById = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ status: "fail", message: "Blog not found" });
  }
  res.status(200).json({ status: "success", data: blog });
});

// Update a blog post by ID
const updateBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  if (req.file && req.file.filename) {
    req.body.image = `blogs/${req.file.filename}`;
  }
  const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
    new: true,
  });

  if (!updatedBlog) {
    return res.status(404).json({ status: "fail", message: "Blog not found" });
  }

  updatedBlog.save();
  res.status(200).json({ status: "success", data: updatedBlog });
});

// Delete a blog post by ID
const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  const deletedBlog = await Blog.findByIdAndDelete(blogId);
  if (!deletedBlog) {
    return res.status(404).json({ status: "fail", message: "Blog not found" });
  }
  res
    .status(200)
    .json({ status: "success", message: "Blog deleted successfully" });
});

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
