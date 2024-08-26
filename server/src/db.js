import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("db connected successfully");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
