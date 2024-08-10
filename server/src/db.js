import mongoose from "mongoose";

export const handleDbConnection = async (url) => {
  try {
    mongoose.connect(url);
    console.log("db connect");
  } catch (error) {
    console.error("error", error);
  }
};

export default handleDbConnection;
