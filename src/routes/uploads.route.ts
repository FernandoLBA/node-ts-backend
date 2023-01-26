import { Router } from "express";
import { createFile } from "../controllers";
import { multerMiddleware, sessionMiddleware } from "../middlewares";

const router = Router();

router.post("/", sessionMiddleware, multerMiddleware.single("myFile"), createFile)

export { router };