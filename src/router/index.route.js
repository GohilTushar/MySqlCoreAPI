import express from "express";
const router = express.Router();

import authenticateUser from "../middleware/auth.middleware.js";
import auth from "./auth.route.js";
import book from "./book.route.js";
import user from "./user.route.js";

router.use("/", user);
router.use("/auth", auth);
router.use("/books", authenticateUser, book);

export default router;
