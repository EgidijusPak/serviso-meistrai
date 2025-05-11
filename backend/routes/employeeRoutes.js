import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  likeEmployee,
  getLikedEmployees,
  dislikeEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.post("/like/:id", likeEmployee);
router.get("/liked/:userId", getLikedEmployees);
router.post("/dislike/:id", dislikeEmployee);
export default router;
