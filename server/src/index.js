import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./router/auth.js";

const app = express();
app.use(express.json());
app.use(cors());

import dotenv from "dotenv";
dotenv.config();

app.use("/api/auth", authRoutes);
const mongodbUrl = process.env.MONGODB_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(`${mongodbUrl}/contact`);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// http://localhost:5000
