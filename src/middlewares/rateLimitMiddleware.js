const rateLimit = require("express-rate-limit");



exports.globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 min
  message: "Too many requests, please try again later"
});



exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // only 5 login attempts
  message: "Too many login attempts, try after 15 minutes"
});


exports.otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3, // only 3 OTP requests
  message: "Too many OTP requests, try later"
});