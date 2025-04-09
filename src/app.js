import express from "express";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/review", reviewRouter);

export default app;
