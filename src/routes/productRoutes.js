import express from "express";
import * as productController from "../controllers/index.js";

const router = express.Router();

router
  .post("/", productController.createPost)
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProductById)
  .delete("/:id", productController.deleteProduct)
  .put("/:id", productController.editProduct);

export default router;
