import { Schema, model } from "mongoose";

const notesSchema = new Schema({
  title: {
    type: String,
    default: "Note",
  },
  description: {
    type: String,
    default: "This is your note.",
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const NotesModel = model("Note", notesSchema);
