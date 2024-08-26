import { User } from "../model/User.js";
import { generateToken } from "./auth.js";
import bcrypt from "bcryptjs";

export const handleRegistration = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let RegisteredUser = await User.findOne({ email });
    if (RegisteredUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = generateToken(user);
    console.log("token", token);

    res.json(token);
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).send("Server error");
  }
};
