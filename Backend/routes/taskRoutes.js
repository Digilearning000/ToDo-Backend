import { Router } from "express";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../controllers/taskcontroller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/test").get(protect, getTasks).post(protect, createTask);
router.route("/test/:id").delete(protect, deleteTask).put(protect, updateTask);

export default router;
