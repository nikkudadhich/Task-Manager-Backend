const Task = require("../models/Task");
const logActivity = require("../utils/activityLogger");
const ErrorHandler = require("../utils/errorHandler");

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
      priority,
      dueDate,
    });

    // ✅ LOG SUCCESS (Correct placement)
    await logActivity(req.user.id, "TASK_CREATED", `Task created: ${title}`);

    res.json({
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    next(error);
  }
};


exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(tasks);

  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = req.task;

    if (!task) {
      throw new ErrorHandler("Task not found", 404);
    }

    await task.update(req.body);

    // ✅ LOG SUCCESS
    await logActivity(req.user.id, "TASK_UPDATED", `Task ID updated: ${task.id}`);

    res.json({
      message: "Task updated successfully",
      task,
    });

  } catch (error) {
    next(error);
  }
};



exports.deleteTask = async (req, res, next) => {
  try {
    const task = req.task;

    if (!task) {
      throw new ErrorHandler("Task not found", 404);
    }

    await task.destroy();

    // ✅ LOG SUCCESS
    await logActivity(req.user.id, "TASK_DELETED", `Task ID deleted: ${task.id}`);

    res.json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};