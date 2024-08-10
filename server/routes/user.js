import express from "express";
import { Router } from "express";
import handleSingup from "../controllers/singup.js";
import handleLogin from "../controllers/login.js";
const router = express.Router();

router.post("/login", handleLogin);
router.post("/singup", handleSingup);

export default router;
