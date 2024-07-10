import express from "express";
const app = express();
import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(".env"),
});
import indexRoute from "./router/index.route.js";
import "./model/index.model.js";

app.use(express.urlencoded({ extends: true }));
app.use(express.json());

app.use("/api", indexRoute);

app.listen(process.env.PORT, () => {
  console.log("App listen at", process.env.PORT);
});

