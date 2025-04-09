import db from "../config/database/db.js";
import { DataTypes } from "sequelize";
import * as reviewStatus from "../config/constants/index.js";

export const Review = db.define(
  "review",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM(Object.values(reviewStatus)),
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);
