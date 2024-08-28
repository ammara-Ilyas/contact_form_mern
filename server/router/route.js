import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { handleRegistration } from "../controllers/register.js";
import { handleLogin } from "../controllers/login.js";

const router = express.Router();

router.post("/register", handleRegistration);
router.post("/login", handleLogin);

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ msg: "This is a protected route" });
});

export default router;
