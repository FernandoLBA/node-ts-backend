import { Router } from "express";
import { createItem, deleteItem, getItem, getItems, updateItem } from "../controllers";
import { createItemValidator, itemIdValidator } from "../validators/items.validator";

const router = Router();

/**
 * Uses the getItems controller
 */
router.get("/", getItems);
router.get("/:id", itemIdValidator, getItem);
router.post("/", createItemValidator, createItem);
router.put("/:id", itemIdValidator, updateItem);
router.delete("/:id", itemIdValidator, deleteItem);

export { router };
