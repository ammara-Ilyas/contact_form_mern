import { User } from "../model/User.js";
import { generateToken } from "./auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json(token);
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Server error");
  }
};
