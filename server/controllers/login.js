import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email", email, "password", password);

    // Find the user by email
    const loginUser = await User.findOne({ email });
    console.log("login", loginUser);

    // Check if the user exists
    if (!loginUser) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, loginUser.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = await loginUser.generateAuthToken();
    // Set the cookie with the token
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 50000), // Cookie will expire in 50 seconds
      httpOnly: true, // This prevents client-side JavaScript from accessing the cookie
      // secure: process.env.NODE_ENV === "production", // Send the cookie over HTTPS only in production
      // sameSite: "strict", // Protects against CSRF attacks
    });
    // Successful login
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handleLogin;
