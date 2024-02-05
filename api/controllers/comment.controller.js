import Comment from "../model/comment.model.js";
// import { errorHandler } from "../utils/error.js";

// controller to create comment
export const createComment = async (req, res, next) => {
  try {
    const { content, userId, postId } = req.body;
    if (userId !== req.body.userId) {
      return next(403, "You are not allowed to create this comment.");
    }

    const newComment = await Comment.create({
      content,
      userId,
      postId,
    });
    res.status(200).json({ success: true, data: newComment });
  } catch (error) {
    next(error);
  }
};
