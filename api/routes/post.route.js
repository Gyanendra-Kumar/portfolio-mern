import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getPosts", getPosts);
router.delete("/deletePost/:postId", verifyToken, deletePost);
// router.put("/updatePost/:postId", verifyToken, updatePost);
router.put("/updatePost/:postId", updatePost);

export default router;
