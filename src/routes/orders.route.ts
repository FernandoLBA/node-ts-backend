import { Router } from "express";
import { getOrders } from "../controllers";
import { sessionMiddleware } from "../middlewares";

const router = Router();

/**
 * Usa el controlador Orders.ts
 */
router.get("/", sessionMiddleware, getOrders);

export { router };
