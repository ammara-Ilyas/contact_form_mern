import jwt from "jsonwebtoken";

// const secret_key = process.env.JWT_SECRET;
const secret_key = "78965412hjyf";

export const generateToken = (user) => {
  const payload = { user: { id: user.id } };
  jwt.sign(payload, secret_key, { expiresIn: "1h" }, (err, token) => {
    console.log("to", token);

    if (err) {
      return "JWT signing error:", err;
    }
    return token;
  });
};

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
