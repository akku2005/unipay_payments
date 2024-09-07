// const express = require("express");
// const PaymentFactory = require("../services/paymentFactory"); // Ensure correct path
// const asyncHandler = require("../utils/asyncHandler"); // Ensure correct path
// const router = express.Router();

// // Route to initiate payment
// router.post(
//   "/initiate",
//   asyncHandler(async (req, res) => {
//     const { gateway, paymentDetails } = req.body;

//     // Check if the gateway is provided
//     if (!gateway || !paymentDetails) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message: "Gateway and payment details are required",
//         });
//     }

//     try {
//       // Get the payment service based on the gateway
//       const paymentService = PaymentFactory.getPaymentService(gateway);

//       // Ensure paymentService and processPayment exist
//       if (
//         !paymentService ||
//         typeof paymentService.processPayment !== "function"
//       ) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Invalid payment gateway" });
//       }

//       // Process the payment
//       const paymentResult = await paymentService.processPayment(paymentDetails);

//       // Send success response
//       res.status(200).json({ success: true, paymentResult });
//     } catch (error) {
//       // Handle and log error
//       console.error("Payment processing error:", error.message);
//       res
//         .status(500)
//         .json({ success: false, message: "Internal server error" });
//     }
//   })
// );

// module.exports = router;

const express = require("express");
const {
  createRazorpayOrder,
  verifyRazorpayPayment,
  handleRazorpayWebhook,
} = require("../controllers/paymentController");

const router = express.Router();

// Create a Razorpay order
router.post("/create-payment", createRazorpayOrder);

// Verify Razorpay payment
router.post("/verify-payment", verifyRazorpayPayment);

// Handle Razorpay webhooks
router.post("/razorpay-webhook", handleRazorpayWebhook);

module.exports = router;
