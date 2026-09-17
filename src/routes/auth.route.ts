import { Router } from "express";
import { loginUser, registerUser } from "../controllers";
import { loginValidator, registerValidator } from "../validators/auth.validator";

const router = Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);

export { router };
