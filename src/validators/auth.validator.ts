import { check } from "express-validator";
import { validateResult } from "../middlewares";

export const registerValidator = [
  check("name").notEmpty().withMessage("name is required"),
  check("email").isEmail().withMessage("email must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
  validateResult,
];

export const loginValidator = [
  check("email").isEmail().withMessage("email must be a valid email address"),
  check("password").notEmpty().withMessage("password is required"),
  validateResult,
];
