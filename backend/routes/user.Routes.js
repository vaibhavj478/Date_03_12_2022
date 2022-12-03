import express from "express";
import {
  createUser,
  deleteUser,

  getAllUser,
  loginUser,
  logoutUser,
  myProfile,
  updatePassword,
  updateProfile,
} from "../api/user.Api.js";
import isAuthenticated from "../middleware/auth.js";

const userRoutes = express.Router();

userRoutes.get("/users", getAllUser);

userRoutes.post("/users", createUser);
userRoutes.post("/users/login", loginUser);
userRoutes.get("/users/logout", logoutUser);

// userRoutes.put("/users/updatePassword", isAuthenticated, updatePassword);

userRoutes.put("/users/updateProfile", isAuthenticated, updateProfile);

userRoutes.get("/myProfile", isAuthenticated, myProfile);

userRoutes.delete("/users/delete", isAuthenticated, deleteUser);

export { userRoutes };
