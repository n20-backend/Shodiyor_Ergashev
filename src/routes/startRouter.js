import express from "express";
import { start } from "../controllers/index.js";

const router = express.Router();

router.get("/", start);

export default router;
