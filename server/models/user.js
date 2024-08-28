import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSachema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timeStamp: true }
);

userSachema.methods.generateAuthToken = async function () {
  console.log("id", this.id);
  try {
    const token = jwt.sign({ id: this.id }, "htghyjklbdrghukloiuytghhjjjbfdds");
    console.log("token in schema", token);
    this.tokens = this.tokens.concat({ token });
    return token;
  } catch (error) {
    console.log("error token", error);
  }
};

userSachema.pre("save", async function (next) {
  console.log("current pasword is ", this.password);
  this.password = await bcrypt.hash(this.password, 10);
  console.log("current pasword is ", this.password);
  next();
});

export const User = mongoose.model("user", userSachema);
