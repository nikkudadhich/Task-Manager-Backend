const express = require("express");
const router = express.Router();

const { signup, verifyOtp, login } = require("../controllers/authController");

const { resendOtp } = require("../controllers/authController");

const validate = require("../middlewares/validationMiddleware");

const {
  signupValidation,
  loginValidation,
} = require("../utils/validationRules");

const { loginLimiter, otpLimiter } = require("../middlewares/rateLimitMiddleware");

// Signup with validation
router.post("/signup", otpLimiter, signupValidation, validate, signup);
router.post("/resend-otp", otpLimiter, resendOtp);
// OTP verify (no validation needed)
router.post("/verify-otp", otpLimiter, verifyOtp);
// Login with validation
router.post("/login", loginLimiter, loginValidation, validate, login);
module.exports = router;