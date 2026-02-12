
const express = require("express");
const cors = require("cors");
const { globalLimiter } = require("./middlewares/rateLimitMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");


require("dotenv").config();
const sequelize = require("./config/db");
const User = require("./models/User");
const app = express();

const Otp = require("./models/Otp");
const authRoutes = require("./routes/authRoutes");
const Task = require("./models/Task");
const taskRoutes = require("./routes/taskRoutes");
const ActivityLog = require("./models/ActivityLog");


app.use(cors());
app.use(globalLimiter);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Task Manager API Running Successfully :)");
});

// Test DB Connection
sequelize
  .authenticate()
  .then(() => console.log("Database Connected Successfully, WOW!"))
  .catch((err) => console.log("Database Connection got an Error:", err));

sequelize.sync()
  .then(() => console.log("Tables created successfully"))
  .catch(err => console.log("Table creation error:", err));

module.exports = app;