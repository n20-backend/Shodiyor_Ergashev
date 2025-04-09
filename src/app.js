import express from "express";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);

export default app;
