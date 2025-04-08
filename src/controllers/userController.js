import { User } from "../models/index.js";
import * as userRoles from "../config/constants/index.js";
import { Op } from "sequelize";
import { v4 } from "uuid";

export const createUser = async (req, res, next) => {
  const newUser = {
    id: v4(),
    ...req.body,
  };
  await User.create(newUser);

  res.json({
    status: "Success",
    message: "New user created",
    error: null,
    data: {
      newUser,
    },
  });
};

export const getAllUsers = async (req, res, next) => {
  const allUsers = await User.findAll();
  res.json({
    status: "Success",
    message: "All users",
    error: null,
    data: {
      allUsers,
    },
  });
};

export const getById = async (req, res, next) => {
  const { id } = req.params;
  const userById = await User.findByPk(id);
  res.json({
    status: "success",
    message: "User by id",
    error: null,
    data: {
      userById,
    },
  });
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  await User.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
  res.json({
    status: "success",
    message: "user deleted",
    error: null,
    data: null,
  });
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const userById = await User.findByPk(id);
  const data = req.body;
  await userById.update(data);
  res.json({
    userById,
  });
};
