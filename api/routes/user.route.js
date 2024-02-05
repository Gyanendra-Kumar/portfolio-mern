import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  signOut,
  getAllUsers,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.get("/getUsers", verifyToken, getAllUsers);
router.get("/:userId", getUser);
router.post("/signout", signOut);

export default router;
