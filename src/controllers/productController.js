import { Product } from "../models/index.js";
import { Op } from "sequelize";
import { v4 } from "uuid";

export const createPost = async (req, res, next) => {
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
};

export const getAllProducts = async (req, res, next) => {
  const allProducts = await Product.findAll();
  res.json({
    status: "success",
    message: "All products",
    error: null,
    data: {
      allProducts,
    },
  });
};

export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const productById = await Product.findByPk(id);

  res.json({
    status: "success",
    message: "Product by id",
    error: null,
    data: {
      productById,
    },
  });
};

export const deleteProduct = async (req, res, next) => {
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
};

export const editProduct = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  const productById = await Product.findByPk(id);

  await productById.update(data);

  res.json({
    status: "success",
    message: "Product edited",
    error: null,
    data: { productById },
  });
};
