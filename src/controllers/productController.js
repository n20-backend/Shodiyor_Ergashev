import { Product } from "../models/index.js";
import { Op } from "sequelize";
import { v4 } from "uuid";
import { productValidate } from "../utils/validate.js";

export const createPost = async (req, res, next) => {
  try {
    const { error, value } = productValidate.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const data = req.body;
    const newProduct = {
      id: v4(),
      ...data,
    };
    await Product.create(newProduct);

    res.json({
      status: "success",
      message: "New product created",
      error: null,
      data: {
        newProduct,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.json({
      status: "success",
      message: "All products",
      error: null,
      data: {
        allProducts,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productById = await Product.findByPk(id);

    if (!productById) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      status: "success",
      message: "Product by id",
      error: null,
      data: {
        productById,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    res.json({
      status: "success",
      message: "Product deleted",
      error: null,
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

export const editProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const productById = await Product.findByPk(id);
    if (!productById) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      return next(error);
    }

    const { error, value } = productValidate.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    await productById.update(data);

    res.json({
      status: "success",
      message: "Product edited",
      error: null,
      data: { productById },
    });
  } catch (error) {
    return next(error);
  }
};
