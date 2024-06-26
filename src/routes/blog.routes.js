import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  filterByTitle,
  filterByAuthor,
} from "../controllers/blog.controllers.js";

const router = Router();

// Create Routes
router.post(
  "/createBlog",
  upload.fields([{ name: "images", maxCount: 1 }]),
  verifyJWT,
  createBlog
);

// Read Routes
router.get("/", verifyJWT, getAllBlogs);
router.get("/:id", verifyJWT, getBlogById);

// Update Routes
router.put("/updateBlog/:id", verifyJWT, updateBlog);

// Delete Routes
router.delete("/deleteBlog/:id", verifyJWT, deleteBlog);

// Filter Routes
router.get("/filterByTitle", verifyJWT, filterByTitle);
router.get("/filterByAuthor", verifyJWT, filterByAuthor);

export default router;
