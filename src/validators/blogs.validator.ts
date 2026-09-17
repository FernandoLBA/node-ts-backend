import { check, param } from "express-validator";
import { validateResult } from "../middlewares";

export const blogIdValidator = [
  param("id").isMongoId().withMessage("id must be a valid identifier"),
  validateResult,
];

export const createBlogValidator = [
  check("title").notEmpty().withMessage("title is required"),
  check("content").notEmpty().withMessage("content is required"),
  check("author").notEmpty().withMessage("author is required"),
  validateResult,
];
