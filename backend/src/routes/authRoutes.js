const express = require("express");
const { check } = require("express-validator");
const {
  registerUser,
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
} = require("../controllers/authController");
const apiLimiter = require("../middlewares/rateLimiter"); // Adjust the path as necessary

const router = express.Router();

// Register user
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  apiLimiter,
  registerUser
);

// Login user
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  apiLimiter,
  loginUser
);

// Refresh token
router.post("/refresh-token", refreshToken);

// Forgot password
router.post(
  "/forgot-password",
  [check("email", "Please include a valid email").isEmail()],
  apiLimiter, // Apply rate limiting to the forgot password route
  forgotPassword
);

// Reset password
router.put(
  "/reset-password/:token",
  [
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  resetPassword
);

router.get("/verify-email/:token", verifyEmail);
module.exports = router;
