import express from "express";
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
