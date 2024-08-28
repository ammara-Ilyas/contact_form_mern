import { User } from "../models/user.js";
import cookies from "cookies";
const handleSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email.trim() });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User({
      name: name.trim(),
      email: email.trim(),
      password: password,
    });

    const token = await newUser.generateAuthToken();
    // Set the cookie with the token
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 50000), // Cookie will expire in 50 seconds
      httpOnly: true, // This prevents client-side JavaScript from accessing the cookie
      // secure: process.env.NODE_ENV === "production", // Send the cookie over HTTPS only in production
      // sameSite: "strict", // Protects against CSRF attacks
    });
    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handleSignup;
