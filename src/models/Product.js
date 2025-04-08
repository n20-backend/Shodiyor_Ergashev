import db from "../config/database/db.js";
import { DataTypes } from "sequelize";
import { Review } from "./Review.js";

export const Product = db.define(
  "product",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);
