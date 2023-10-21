import { UserModel } from "../models/userModel.js";
import { NotesModel } from "../models/notesModel.js";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import { CustomError } from "../middlewares/errorMiddleware.js";
import jwt from "jsonwebtoken";

config();

export const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (userExist) return next(new CustomError("User already exist", 400));

    const hashPassword = await bcrypt.hash(password, 15);

    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET_KEY);

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 3600 * 1000,
        sameSite: "None",
        secure: true,
      })
      .json({
        success: true,
        message: "Account created",
      });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    const passwordMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!user || !passwordMatch)
      return next(new CustomError("Invalid email or password", 404));

    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET_KEY);

    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 3600 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .json({
        success: true,
        message: "Successfully Logged in",
      });
  } catch (error) {
    next(error);
  }
};

export const userLogout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .json({
      success: true,
      message: "logged out successfully",
    });
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) return next(new CustomError("Account don't exist", 404));

    await NotesModel.deleteMany({ user: id });
    await user.deleteOne();

    res
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        message: "Account successfully deleted",
      });
  } catch (error) {
    next(error);
  }
};
