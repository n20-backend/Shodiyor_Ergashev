import { Review } from "../models/index.js";
import { Op } from "sequelize";
import { v4 } from "uuid";

export const createReview = async (req, res, next) => {
  const data = req.body;
  const newReview = {
    id: v4(),
    ...data,
  };

  await Review.create(newReview);

  res.json({
    status: "success",
    message: "New review created",
    error: null,
    data: {
      newReview,
    },
  });
};

export const getAllReviews = async (req, res, next) => {
  const allReviews = await Review.findAll();

  res.json({
    status: "success",
    message: "All reviews",
    error: null,
    data: {
      allReviews,
    },
  });
};

export const getReviewById = async (req, res, next) => {
  const { id } = req.params;

  const reviewById = await Review.findByPk(id);

  res.json({
    status: "success",
    message: "Review by id",
    error: null,
    data: {
      reviewById,
    },
  });
};

export const deleteReview = async (req, res, next) => {
  const { id } = req.params;
  await Review.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
  res.json({
    status: "success",
    message: "review deleted",
    error: null,
    data: null,
  });
};

export const editReview = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  const reviewById = await Review.findByPk(id);

  await reviewById.update(data);

  res.json({
    status: "success",
    message: "Review edited",
    error: null,
    data: {
      reviewById,
    },
  });
};
