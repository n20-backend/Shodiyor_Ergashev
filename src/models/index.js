import { User } from "./User.js";
import { Product } from "./Product.js";
import { Review } from "./Review.js";

User.hasMany(Review, { as: "review" });
Review.belongsTo(User);

Product.hasMany(Review, { as: "review" });
Review.belongsTo(Product);

export { User, Product, Review };
