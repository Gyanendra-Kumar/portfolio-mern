import express from "express";
import {
  createComment,
  getComments,
  likeComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getPostComment/:postId", getComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);

export default router;
