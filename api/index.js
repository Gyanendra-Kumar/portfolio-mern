import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";

// connect to DB
connectDB();

const app = express();

// Enable cors for all routes
app.use(cors());

// routes for api
app.use("/api/user", userRoutes);

app.listen(3000, () => {
  console.log(`Server is listening on port 3000!`);
});
