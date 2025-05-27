import express from "express";
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staff.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllStaff);
router.post("/", authMiddleware, createStaff);
router.put("/:id", authMiddleware, updateStaff);
router.delete("/:id", authMiddleware, deleteStaff);

export default router;
