import express from "express";
import * as reviewController from "../controllers/index.js";

const router = express.Router();

router
  .post("/", reviewController.createReview)
  .get("/", reviewController.getAllReviews)
  .get("/:id", reviewController.getReviewById)
  .delete("/:id", reviewController.deleteReview)
  .put("/:id", reviewController.editReview);

export default router;
