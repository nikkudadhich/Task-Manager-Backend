const { body } = require("express-validator");

exports.signupValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password required"),
];

exports.taskValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("priority")
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
];