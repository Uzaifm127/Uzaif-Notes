import { CustomError } from "../middlewares/errorMiddleware.js";
import { NotesModel } from "../models/notesModel.js";

export const addNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { _id } = req.user;

    const note = await NotesModel.create({ title, description, user: _id });

    res.status(201).json({
      success: true,
      message: "Note added",
      note,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyNotes = async (req, res) => {
  try {
    const notes = await NotesModel.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await NotesModel.findById(id);

    if (!note) return next(new CustomError("Not found", 404));

    note.deleteOne();

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const editNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await NotesModel.findById(id);

    if (!note) return next(new CustomError("Not found", 404));

    const { title, description } = req.body;

    note.title = title;
    note.description = description;

    await note.save();

    res.status(200).json({
      success: true,
      message: "Note Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
