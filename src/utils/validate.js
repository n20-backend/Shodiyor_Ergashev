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
