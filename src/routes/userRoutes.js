import express from "express";
import * as userController from "../controllers/index.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .post("/register", userController.createUser)
  .post("/login", userController.login)
  .get("/me", authMiddleware, userController.getMe)
  .get("/", authMiddleware, userController.getAllUsers)
  .get("/:id", authMiddleware, userController.getById)
  .delete("/:id", authMiddleware, userController.deleteUser)
  .put("/:id", authMiddleware, userController.updateUser);

export default router;
