import Post from "../model/post.model.js";
import { errorHandler } from "../utils/error.js";

// CONTROLLER TO CREATE PROJECTS
export const create = async (req, res, next) => {
  // console.log(req);
  if (!req.user.isAdmin && !req.user.isEditor) {
    return next(errorHandler(403, "You are not allowed to create posts"));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  try {
    const newPost = await Post.create({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(error);
  }
};
// console.log(newPost);
// CONTROLLERS TO GET ALL
export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    next(error);
  }
};

// DELETE POST
export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(
        403,
        "Not authorized!, Contact your administrator to delete the project."
      )
    );
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "Project have been deleted." });
  } catch (error) {
    next(error);
  }
};

// update posts
export const updatePost = async (req, res, next) => {
  if (!req.user.isAdmin && !req.user.isEditor) {
    return next(errorHandler(403, "You are not allowed to update this post!"));
  }

  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
          slug: req.body.title
            .split(" ")
            .join("-")
            .toLowerCase()
            .replace(/[^a-zA-Z0-9-]/g, ""),
        },
      },
      { new: true }
    );

    res.status(200).json(updatePost);
  } catch (error) {
    next(error);
  }
};
