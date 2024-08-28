
import { User } from "../model/User.js";
import { generateToken } from "./auth.js";
import bcrypt from "bcryptjs";

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("req", req.body);

  try {
    // Correctly finding a single user
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials email" });
    }
    console.log("ok");

    // Correct password comparison
    console.log("user password", password);
    // const salt = await bcrypt.genSalt(10);
    // const passwor = await bcrypt.hash(password, salt);

    const isMatch = user.password == password;
    // const isMatch = await bcrypt.compare(passwor, user.password);
    console.log("ismatch", isMatch);
    console.log(" password", password);
    console.log("user password", user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials pasword" });
    }

    // Generate token
    const token = await generateToken(user);
    console.log("token", token); // Debugging log for token

    res.status(200).json({ user: { id: user._id, email: user.email }, token }); // Send minimal user data
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Server error");
  }
};