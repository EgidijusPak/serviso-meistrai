import express from "express";
import { register, login, getMe } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getMe); // e.g. /api/auth/me
export default router;
