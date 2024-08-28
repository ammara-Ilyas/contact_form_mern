import mongoose from "mongoose";

<<<<<<< HEAD
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
=======
export const handleDbConnection = async (url) => {
  try {
    mongoose.connect(url);
    console.log("db connect");
  } catch (error) {
    console.error("error", error);
  }
};

export default handleDbConnection;
>>>>>>> 8666a84bd1a0cf6129e8221027104978c0e33be8
