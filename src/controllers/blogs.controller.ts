import { Request, Response } from "express";

/**
 * Lists all blogs
 * @param req
 * @param res
 */
export const getBlogs = (req: Request, res: Response) => {
  res.send({data: "Listing all blogs"})
}

/**
 * Gets a blog by id
 * @param req
 * @param res
 */
export const getBlog = (req: Request, res: Response) => {
  try {
    res.send({data: "Showing blog " + req.params.id})
  } catch (error) {
    console.log(error)
  }
}

/**
 * Creates a blog
 * @param req
 * @param res
 */
export const createBlog = (req: Request, res: Response) => {
  res.send({message: "Blog created", data: req.body})
}

/**
 * Updates a blog
 * @param req
 * @param res
 */
export const updateBlog = (req: Request, res: Response) => {
  res.send({data: "Updating blog " + req.params.id})
}

/**
 * Deletes a blog
 * @param req
 * @param res
 */
export const deleteBlog = (req: Request, res: Response) => {
  res.send({data: "Deleting blog " + req.params.id})
}