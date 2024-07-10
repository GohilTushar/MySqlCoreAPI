import express from "express";
import {
  userList,
  userDetails,
  userDelete,
  updateProfile,
} from "../controller/user.controller.js";
import upload from "../middleware/upload.middleware.js";
import authenticateUser from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("/users").get(userList);
router.route("/profile").get(authenticateUser, userDetails);
router.route("/delete").delete(authenticateUser, userDelete);
router.route("/update").put(authenticateUser, upload, updateProfile);

export default router;
