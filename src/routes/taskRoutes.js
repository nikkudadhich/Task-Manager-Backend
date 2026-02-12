const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const validate = require("../middlewares/validationMiddleware");
const { taskValidation } = require("../utils/validationRules");

const authorizeTask = require("../middlewares/authorizeTask");


// Create task with validation
router.post("/", authMiddleware, taskValidation, validate, createTask);

// Get all tasks
router.get("/", authMiddleware, getTasks);

// Update task
router.put("/:id", authMiddleware, authorizeTask, updateTask);

// Delete task
router.delete("/:id", authMiddleware, authorizeTask, deleteTask);

module.exports = router;