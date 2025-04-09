import { User } from "../models/index.js";
import * as userRoles from "../config/constants/index.js";
import { Op } from "sequelize";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { userValidate } from "../utils/validate.js";

export const createUser = async (req, res, next) => {
  const { error, value } = userValidate.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
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
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username: {
        [Op.eq]: username,
      },
    },
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Password",
    });
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
};

export const getMe = async (req, res, next) => {
  const currentUser = req.user;
  const user = await User.findOne({
    where: {
      username: {
        [Op.eq]: currentUser.username,
      },
    },
  });

  if (!user) {
    return next("User not found");
  }

  res.json({
    data: {
      user,
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

  if (!userById) {
    res.status(404).json({
      message: "User not found",
    });
  }
  const { error, value } = userValidate.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }
  let data = { ...req.body };

  if (data.password) {
    console.log("Kod o'zgartirilyapti");
    data.password = await bcrypt.hash(data.password, 10);
  }
  await userById.update(data);

  res.json({
    status: "success",
    message: "User updated",
    error: null,
    data: null,
  });
};
