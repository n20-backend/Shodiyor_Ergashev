import { Review } from "../models/index.js";
import { Op } from "sequelize";
import { v4 } from "uuid";
import { reviewValidate } from "../utils/validate.js";

export const createReview = async (req, res, next) => {
  try {
    const { error, value } = reviewValidate.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
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
  } catch (error) {
    return next(error);
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const allReviews = await Review.findAll();

    res.json({
      status: "success",
      message: "All reviews",
      error: null,
      data: {
        allReviews,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reviewById = await Review.findByPk(id);

    if (!reviewById) {
      const error = new Error("Review not found");
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      status: "success",
      message: "Review by id",
      error: null,
      data: {
        reviewById,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
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
  } catch (error) {
    return next(error);
  }
};

export const editReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const reviewById = await Review.findByPk(id);

    if (!reviewById) {
      const error = new Error("review not found");
      error.statusCode = 404;
      return next(error);
    }

    const { error, value } = reviewValidate.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    await reviewById.update(data);

    res.json({
      status: "success",
      message: "Review edited",
      error: null,
      data: {
        reviewById,
      },
    });
  } catch (error) {
    return next(error);
  }
};
