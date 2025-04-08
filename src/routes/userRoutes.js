import express from "express";
import * as userController from "../controllers/index.js";

const router = express.Router();

router
  .post("/", userController.createUser)
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getById)
  .delete("/:id", userController.deleteUser)
  .put("/:id", userController.updateUser);

export default router;
