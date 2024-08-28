import jwt from "jsonwebtoken";

// const secret_key = process.env.JWT_SECRET;
const secret_key = "78965412hjyf";

export const generateToken = (user) => {
  const payload = { user: { id: user.id } };

  // Return a new promise
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret_key, { expiresIn: "10s" }, (err, token) => {
      console.log("to", token);

      if (err) {
        console.error("JWT signing error:", err);
        reject("Server error");
      } else {
        resolve(token);
      }
    });
  });
};
export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
