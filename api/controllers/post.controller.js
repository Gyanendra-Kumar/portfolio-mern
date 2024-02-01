import Post from "../model/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  //   console.log(req.user.isAdmin);
  if (!req.user.isAdmin && !req.user.isEditor) {
    return next(errorHandler(403, "You are not allowed to create posts"));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const slug = req.body.title
    .split(" ")
    .join("%")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  try {
    const newPost = await Post.create({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    console.log(newPost);
    res.status(201).json({ success: true, savePost: newPost });
  } catch (error) {
    next(error);
  }
};
