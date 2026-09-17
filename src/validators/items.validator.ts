import { check, param } from "express-validator";
import { validateResult } from "../middlewares";

export const itemIdValidator = [
  param("id").isMongoId().withMessage("id must be a valid identifier"),
  validateResult,
];

export const createItemValidator = [
  check("name").notEmpty().withMessage("name is required"),
  check("color").notEmpty().withMessage("color is required"),
  check("gas")
    .isIn(["gasoline", "electric"])
    .withMessage("gas must be either gasoline or electric"),
  check("year").isInt().withMessage("year must be a number"),
  check("description").notEmpty().withMessage("description is required"),
  check("price")
    .isFloat({ min: 0 })
    .withMessage("price must be a positive number"),
  validateResult,
];

export const updateItemValidator = [
  param("id").isMongoId().withMessage("id must be a valid identifier"),
  validateResult,
];
