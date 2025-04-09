import { User } from "../models/index.js";
import * as userRoles from "../config/constants/index.js";
import { Op } from "sequelize";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { userValidate } from "../utils/validate.js";
import { AppError } from "../utils/AppError.js";

export const createUser = async (req, res, next) => {
  try {
    const { error, value } = userValidate.validate(req.body);
    if (error) {
      return next(error);
    }
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: v4(),
      ...req.body,
      password: hashedPassword,
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
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username: {
          [Op.eq]: username,
        },
      },
    });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 400;
      return next(error);
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      status: user.status,
    };
    const jwtSecret = process.env.JWT_SECRET;
    const token = await generateToken(payload, jwtSecret, {
      algorithm: "HS512",
      expiresIn: "1d",
    });

    res.json({
      status: "success",
      message: "Loggen in successfully",
      error: null,
      data: {
        user: {
          ...payload,
        },
        jwt: token,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const user = await User.findOne({
      where: {
        username: {
          [Op.eq]: currentUser.username,
        },
      },
    });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      data: {
        user,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.json({
      status: "Success",
      message: "All users",
      error: null,
      data: {
        allUsers,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await User.findByPk(id);
    if (!userById) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      status: "success",
      message: "User by id",
      error: null,
      data: {
        userById,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
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
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await User.findByPk(id);

    if (!userById) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    const { error, value } = userValidate.validate(req.body);
    if (error) {
      return next(error);
    }
    let data = { ...req.body };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await userById.update(data);

    res.json({
      status: "success",
      message: "User updated",
      error: null,
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};
