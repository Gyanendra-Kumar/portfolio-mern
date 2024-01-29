import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
import cors from "cors";

import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

// connect to DB
connectDB();

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

// middlewares
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
