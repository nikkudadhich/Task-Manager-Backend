const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Otp = require("../models/Otp");
const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");
const ErrorHandler = require("../utils/errorHandler");
const logActivity = require("../utils/activityLogger");


exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ErrorHandler("User already exists", 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate OTP
    const otpCode = generateOtp();

    // Save OTP
    await Otp.create({
      userId: user.id,
      otpCode,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Send email
    await sendEmail(email, "Your OTP Code", `Your OTP is ${otpCode}`);

    // ✅ CORRECT PLACE FOR LOGGING
    await logActivity(user.id, "SIGNUP", "User registered and OTP sent. Check it out :)");

    res.json({
      message: "Signup successful. Check Email for OTP.",
    });

  } catch (error) {
    next(error);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }

    // Find OTP record
    const otpRecord = await Otp.findOne({
      where: { userId: user.id, otpCode: otp },
    });

    if (!otpRecord) {
      throw new ErrorHandler("Invalid OTP", 400);
    }

    // Check expiry
    if (otpRecord.expiresAt < new Date()) {
      throw new ErrorHandler("OTP expired", 400);
    }

    // Mark user verified
    user.isVerified = true;
    await user.save();

    // Delete OTP
    await otpRecord.destroy();

    // ✅ LOGGING (Correct Placement)
    await logActivity(user.id, "OTP_VERIFIED", "User verified account");

    res.json({
      message: "Account verified successfully",
    });

  } catch (error) {
    next(error);
  }
};


const jwt = require("jsonwebtoken");
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      await logActivity(null, "LOGIN_FAILED", `Login failed for email: ${email}`);
      throw new ErrorHandler("User not found", 404);
    }

    // Check verified
    if (!user.isVerified) {
      await logActivity(user.id, "LOGIN_FAILED", "Tried login before verification");
      throw new ErrorHandler("Please verify your account first", 400);
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      await logActivity(user.id, "LOGIN_FAILED", "Incorrect password");
      throw new ErrorHandler("Invalid password", 400);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ SUCCESS LOGGING (Correct placement)
    await logActivity(user.id, "LOGIN_SUCCESS", "User logged in");

    res.json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    next(error);
  }
};


exports.resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      await logActivity(null, "OTP_RESEND_FAILED", `User not found for email: ${email}`);
      throw new ErrorHandler("User not found", 404);
    }

    if (user.isVerified) {
      await logActivity(user.id, "OTP_RESEND_FAILED", "Tried to resend OTP after verification");
      throw new ErrorHandler("Account already verified", 400);
    }

    // Generate new OTP
    const otpCode = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Save OTP
    await Otp.create({
      userId: user.id,
      otpCode,
      expiresAt,
    });

    // Send Email
    await sendEmail(email, "Your New OTP Code", `Your OTP is ${otpCode}`);

    // ✅ LOG SUCCESS
    await logActivity(user.id, "OTP_RESENT", "New OTP sent to user");

    res.json({ message: "New OTP sent to email" });

  } catch (error) {
    next(error);
  }
};