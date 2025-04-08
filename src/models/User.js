import sequelize from "../config/database/db.js";
import { DataTypes } from "sequelize";
import * as userRole from "../config/constants/index.js";
import * as userStatus from "../config/constants/index.js";
import { Review } from "./Review.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(Object.values(userRole)),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(Object.values(userStatus)),
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);
