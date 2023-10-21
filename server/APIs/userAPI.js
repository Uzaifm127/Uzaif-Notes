import Router from "express";
import {
  userRegister,
  userLogin,
  deleteUser,
  getMyProfile,
  userLogout,
} from "../controllers/userController.js";
import { authenticated } from "../middlewares/authMiddleware.js";

export const userRouter = Router();

userRouter.post("/register", userRegister);

userRouter.post("/login", userLogin);

userRouter.get("/logout", authenticated, userLogout);

userRouter.get("/profile", authenticated, getMyProfile);

userRouter.delete("/delete/:id", authenticated, deleteUser);
