import Comment from "../model/comment.model.js";
import { errorHandler } from "../utils/error.js";

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

// get all comments
export const getComments = async (req, res, next) => {
  try {
    const allComments = await Comment.find({
      postId: req.params.postId,
    }).sort({ createdAt: -1 });

    res.status(200).json(allComments);
  } catch (error) {
    next(error);
  }
};

// like comment
export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return next(errorHandler(404, "Comment not found"));

    const userIndex = comment.likes.indexOf(req.user.id);

    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
