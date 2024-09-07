const express = require("express");
const {
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require("../controllers/paymentController");

const router = express.Router();

// Define the routes
router.post("/create-payment", createRazorpayOrder);
router.post("/verify-payment", verifyRazorpayPayment);

module.exports = router;
