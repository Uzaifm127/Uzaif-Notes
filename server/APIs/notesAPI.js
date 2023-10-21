import Router from "express";
import {
  addNote,
  deleteNote,
  editNote,
  getMyNotes,
} from "../controllers/notesController.js";
import { authenticated } from "../middlewares/authMiddleware.js";

export const notesRouter = Router();

notesRouter.get("/all", authenticated, getMyNotes);

notesRouter.post("/add", authenticated, addNote);

notesRouter.put("/edit/:id", authenticated, editNote);

notesRouter.delete("/remove/:id", authenticated, deleteNote);
