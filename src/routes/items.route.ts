import { Router } from "express";
import { createItem, deleteItem, getItem, getItems, updateItem } from "../controllers";

const router = Router();

/**
 * Usa el controlador getItems
 */
router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export { router };
