const Task = require("../models/Task");

module.exports = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check ownership
    if (task.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access! You can't get it." });
    }

    req.task = task; // attach task to request
    next();

  } catch (error) {
    res.status(500).json({ message: "Authorization check failed" });
  }
};