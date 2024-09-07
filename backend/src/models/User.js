// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate and hash the reset password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expiration time (e.g., 1 hour)
  this.resetPasswordExpire = Date.now() + 3600000; // 1 hour

  return resetToken;
};

// Method to generate and hash the email verification token
UserSchema.methods.getEmailVerificationToken = function () {
  // Generate token
  const verificationToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to emailVerificationToken field
  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  // Set token expiration time (e.g., 1 hour)
  this.emailVerificationExpire = Date.now() + 3600000; // 1 hour

  return verificationToken;
};

module.exports = mongoose.model("User", UserSchema);
