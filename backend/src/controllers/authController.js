// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// const { validationResult } = require("express-validator");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Function to generate JWT tokens
const generateTokens = (user, deviceInfo) => {
  const payload = { id: user.id, deviceInfo };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION,
  });

  return { accessToken, refreshToken };
};

// Function to generate email verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Function to send verification email
const sendVerificationEmail = async (user, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  const message = `Please verify your email by clicking on the following link: ${verificationUrl}`;

  try {
    await sendEmail({
      to: user.email, // This should now work correctly
      subject: "Email Verification",
      text: message,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Email could not be sent");
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log(`Registering user with email: ${email}`);

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log("User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    user = new User({
      name,
      email,
      password,
    });

    console.log("Creating new user");

    // Generate email verification token
    const emailVerificationToken = generateVerificationToken();
    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationExpire = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send verification email
    await sendVerificationEmail(user, emailVerificationToken);

    res
      .status(201)
      .json({ msg: "User registered successfully. Please verify your email." });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Save the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    // Set the refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send the access token as a response
    res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Refresh access token
const refreshToken = async (req, res) => {
  const oldRefreshToken = req.cookies ? req.cookies.refreshToken : null;

  if (!oldRefreshToken) {
    return res.status(403).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== oldRefreshToken) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    // Save new refresh token and invalidate old one
    user.refreshToken = newRefreshToken;
    await user.save();

    // Set new refresh token in cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    console.error("Error in refreshToken:", err);
    res.status(403).json({ msg: "Invalid refresh token" });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    // Save token to DB
    await user.save();

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;

    // Create email message
    const message = `You have requested to reset your password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ msg: "Email sent" });
    } catch (err) {
      console.error("Error in forgotPassword (email):", err.message);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.status(500).json({ msg: "Email could not be sent" });
    }
  } catch (err) {
    console.error("Error in forgotPassword:", err.message);
    res.status(500).send("Server error");
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  // Hash the token from the URL
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ msg: "Password reset successful" });
  } catch (err) {
    console.error("Error in resetPassword:", err.message);
    res.status(500).send("Server error");
  }
};

// Logout User
const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    // Clear the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    console.error("Error in logoutUser:", err.message);
    res.status(500).send("Server error");
  }
};

// Email Verification
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;

    await user.save();

    res.status(200).json({ msg: "Email verified successfully" });
  } catch (err) {
    console.error("Error in verifyEmail:", err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  logoutUser,
  verifyEmail,
};
