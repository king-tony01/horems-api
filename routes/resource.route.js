import express from "express";
import {
  getAllResources,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resource.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllResources);
router.post("/", authMiddleware, createResource);
router.put("/:id", authMiddleware, updateResource);
router.delete("/:id", authMiddleware, deleteResource);

export default router;
