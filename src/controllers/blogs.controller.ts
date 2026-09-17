import { Request, Response } from "express";
import { handleHttpError } from "../utils";
import {
  createBlogService,
  deleteBlogService,
  getBlogService,
  getBlogsService,
  updateBlogService,
} from "../services";

/**
 * Lists all blogs
 * @param req
 * @param res
 */
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const data = await getBlogsService();

    res.send({ message: "Blogs listed", data });
  } catch (error) {
    handleHttpError(res, "ERROR_GETTING_BLOGS", error);
  }
};

/**
 * Gets a blog by id
 * @param req
 * @param res
 */
export const getBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getBlogService(id);

    if (!data) {
      handleHttpError(res, "NOT_FOUND", "", 404);

      return;
    }

    res.send({ message: "Blog found", data });
  } catch (error) {
    handleHttpError(res, "ERROR_GETTING_BLOG", error);
  }
};

/**
 * Creates a blog
 * @param req
 * @param res
 */
export const createBlog = async (req: Request, res: Response) => {
  try {
    const data = await createBlogService(req.body);

    res.send({ message: "Blog created", data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATING_BLOG", error);
  }
};

/**
 * Updates a blog
 * @param req
 * @param res
 */
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await updateBlogService(id, req.body);

    if (!data) {
      handleHttpError(res, "NOT_FOUND", "", 404);

      return;
    }

    res.send({ message: "Blog updated", data });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATING_BLOG", error);
  }
};

/**
 * Deletes a blog
 * @param req
 * @param res
 */
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await deleteBlogService(id);

    if (!data) {
      handleHttpError(res, "NOT_FOUND", "", 404);

      return;
    }

    res.send({ message: "Blog deleted", data: [] });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETING_BLOG", error);
  }
};
