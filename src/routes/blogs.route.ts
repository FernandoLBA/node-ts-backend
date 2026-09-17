import { Router } from "express";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controllers";
import { blogIdValidator, createBlogValidator } from "../validators/blogs.validator";

const router = Router();

/**
 * Uses the blogs.ts controller
 */
router.get("/", getBlogs);
router.get("/:id", blogIdValidator, getBlog);
router.post("/", createBlogValidator, createBlog);
router.put("/:id", blogIdValidator, updateBlog);
router.delete("/:id", blogIdValidator, deleteBlog);

export { router };
