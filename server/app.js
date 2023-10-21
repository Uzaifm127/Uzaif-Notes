import express from "express";
import { userRouter } from "./APIs/userAPI.js";
import { notesRouter } from "./APIs/notesAPI.js";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://uzaif-keep.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Route Middleware
app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", notesRouter);

// Using error middleware
app.use(errorMiddleware);
