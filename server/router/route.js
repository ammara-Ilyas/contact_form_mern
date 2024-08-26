import express from "express";
import { handleRegistration } from "../controllers/register.js";
import { handleLogin } from "../controllers/login.js";

const router = express.Router();

router.post("/register", handleRegistration);
router.post("/login", handleLogin);

export default router;
