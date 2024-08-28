import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 20 },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
// UserSchema.pre("save", async function (next) {
//   // if (!this.isModified("password")) {
//   //   return next();
//   // }

//   try {
//     // const salt = await bcrypt.genSalt(10);
//     // this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

export const User = mongoose.model("User", UserSchema);
