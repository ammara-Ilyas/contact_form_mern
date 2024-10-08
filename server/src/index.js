import express from "express";
<<<<<<< HEAD
import connectDB from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import router from "../router/route.js";
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.urlencoded({ extended: "false" }));
app.use(express.json());
app.use(cors(corsOptions));

dotenv.config();

app.use("/api/auth", router);

const url = process.env.MONGODB_URL;
const port = process.env.PORT || 5000;
connectDB(url);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
=======
import dotenv from "dotenv";
import handleDbConnection from "./db.js";

import router from "../routes/user.js";

const app = express();

dotenv.config();
const url = process.env.MONGODB_URI;
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", router);

handleDbConnection(url);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
>>>>>>> 8666a84bd1a0cf6129e8221027104978c0e33be8
