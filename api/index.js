import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
import cors from "cors";

import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import path from "path";

// connect to DB
connectDB();

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Enable cors for all routes
app.use(cors());

app.listen(3000, () => {
  console.log(`Server is listening on port 3000!`);
});

// routes for api
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRouter);

// static folders
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// middlewares
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
