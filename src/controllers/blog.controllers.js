import asyncHandler from "../utils/asyncHandler.js";
import { Blog } from "../models/blog.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create Blog Post
const createBlog = asyncHandler(async (req, res) => {
  console.log("Create Blog API is called");
  const { title, content } = req.body;
  const images = req.files?.images || []; // Multer stores files in req.files
  const author = req.user._id;

  // Upload images to Cloudinary if provided
  const imageUrls = images.length
    ? await Promise.all(images.map((image) => uploadOnCloudinary(image)))
    : [];

  const newBlog = new Blog({
    title,
    content,
    images: imageUrls,
    author,
  });

  await newBlog.save();
  return res
    .status(201)
    .json(new ApiResponse(201, "Blog created successfully", newBlog));
});

// Get all Blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  console.log("All Blogs API is called");
  const allBlogPosts = await Blog.find().populate("author", "fullName");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "All blog posts are fetched successfully",
        allBlogPosts
      )
    );
});

// Get Single Blog
const getBlogById = asyncHandler(async (req, res) => {
  console.log("Single Blog API is called");
  const { id } = req.params;
  console.log(id);
  const blog = await Blog.findById(id).populate("author", "fullName");
  if (!blog) {
    throw new ApiError(400, "No such blog exists");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Single Blog is fetched successfully", blog));
});

// Update Blog
const updateBlog = asyncHandler(async (req, res) => {
  console.log("Update Blog API is called");
  const { title, content, author, images } = req.body;
  const blogUpdate = await Blog.findOne({ title });
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogUpdate._id,
    { title, content, author, images },
    { new: true }
  ).populate("author", "fullName");
  if (!updatedBlog) {
    throw new ApiError(400, "Blog not updated");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Blog updated successfully", updatedBlog));
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  console.log("Delete Blog API is called");
  const { id } = req.params;
  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (!deletedBlog) {
    throw new ApiError(400, "Cannot delete Blog");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Blog deleted successfully"));
});

// Filter Blogs by Title
const filterByTitle = asyncHandler(async (req, res) => {
  console.log("helll")
  const title = req.query.title;
  console.log("title",title);
  const filteredBlogs = await Blog.find({
    title: title,
  }).populate("author", "fullName");
  return res
    .status(200)
    .json(new ApiResponse(200, "Blogs filtered by title", filteredBlogs));
});

// Filter Blogs by Author
const filterByAuthor = asyncHandler(async (req, res) => {
  const { author } = req.query;
  const authorUser = await User.findOne({ fullName: author });
  if (!authorUser) {
    throw new ApiError(400, "No such author found");
  }
  const filteredBlogs = await Blog.find({ author: authorUser._id }).populate(
    "author",
    "fullName"
  );
  return res
    .status(200)
    .json(new ApiResponse(200, "Blogs filtered by author", filteredBlogs));
});

export {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  filterByTitle,
  filterByAuthor,
};
