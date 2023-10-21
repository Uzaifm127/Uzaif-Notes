import express from "express";
import { userRouter } from "./APIs/userAPI.js";
import { notesRouter } from "./APIs/notesAPI.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";

config();

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Route Middleware
app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", notesRouter);

// Using error middleware
app.use(errorMiddleware);
