import { UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Please login first",
    });

  const { user } = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const authUser = await UserModel.findById(user);

  req.user = authUser;

  next();
};
