import { User } from "../model/User.js";
import { generateToken } from "./auth.js";
import bcrypt from "bcryptjs";

export const handleRegistration = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("req registration", req.body);

  try {
    let RegisteredUser = await User.findOne({ email });
    if (RegisteredUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: password });
    await user.save();
    const token = await generateToken(user);

    res.status(201).send({ user, token });
    // console.log("token", token);
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).send("Server error");
  }
};
