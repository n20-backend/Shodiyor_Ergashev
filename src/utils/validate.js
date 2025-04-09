import Joi from "joi";

export const userValidate = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required().min(3).max(15),
  password: Joi.string().required().min(3).max(15),
  role: Joi.string().required(),
  status: Joi.string().required(),
});

export const productValidate = Joi.object({
  name: Joi.string().required().min(3).max(15),
  description: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
});

export const reviewValidate = Joi.object({
  rating: Joi.number().min(1).max(5).required().messages({
    "number.min": "Rating should be between 1 to 5",
    "number.max": "Rating should be between 1 to 5",
    "any.required": "Rating is required",
    "number.base": "Rating must be a number",
  }),
  content: Joi.string(),
  status: Joi.string().required(),
  productId: Joi.string().required(),
  userId: Joi.string().required(),
});
