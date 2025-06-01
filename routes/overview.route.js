import express from "express";
import { getOverview } from "../controllers/overview.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getOverview);

export default router;
