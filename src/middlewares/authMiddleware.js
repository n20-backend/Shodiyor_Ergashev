import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader, "AAAAAAAAAAAAAA");

  if (!authHeader) {
    return next("Registratsiyadan o'tilmagan", 401);
  }

  const token = authHeader.slice(7);

  try {
    const user = jwt.verify(token, jwtSecret, {
      algorithms: ["HS512"],
    });
    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};
