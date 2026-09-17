import { Router } from "express";
import { getOrders } from "../controllers";
import { sessionMiddleware } from "../middlewares";

const router = Router();

/**
 * Uses the Orders.ts controller
 */
router.get("/", sessionMiddleware, getOrders);

export { router };
