import express from "express";
import { signup, login } from "../controller/auth.controller.js";
import upload from "../middleware/upload.middleware.js";
const router = express.Router();

router.route("/signup").post(upload, signup);
router.route("/login").post(login);

export default router;
