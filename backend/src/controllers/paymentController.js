// const StripeService = require("../services/payment/stripeService");
// const RazorpayService = require("../services/payment/razorpayService");
// const Payment = require("../models/Payment");

// const stripeService = new StripeService();
// const razorpayService = new RazorpayService();

// // Create payment and save to MongoDB
// exports.createPayment = async (req, res) => {
//   try {
//     const { amount, currency = "INR", gateway, metadata } = req.body;
//     let paymentIntent;

//     if (gateway === "stripe") {
//       paymentIntent = await stripeService.createPaymentIntent(
//         amount,
//         currency,
//         metadata
//       );
//     } else if (gateway === "razorpay") {
//       paymentIntent = await razorpayService.createOrder(
//         amount,
//         currency,
//         metadata
//       );
//     } else {
//       return res.status(400).json({ message: "Invalid payment gateway" });
//     }

//     // Save payment details to MongoDB
//     const payment = new Payment({
//       paymentId: paymentIntent.id,
//       amount,
//       currency,
//       gateway,
//       metadata,
//       status: "created",
//     });
//     await payment.save();

//     res.status(201).json({ success: true, paymentIntent });
//   } catch (error) {
//     console.error("Payment creation error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Handle Stripe webhook and update MongoDB
// exports.handleStripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   const payload = req.body;

//   try {
//     const event = stripeService.verifyWebhook(payload, sig);

//     switch (event.type) {
//       case "payment_intent.succeeded":
//         const paymentIntent = event.data.object;
//         console.log("Payment succeeded:", paymentIntent.id);

//         // Update payment status in MongoDB
//         await Payment.findOneAndUpdate(
//           { paymentId: paymentIntent.id },
//           { status: "succeeded" }
//         );
//         break;
//       // Add more event types as needed
//       default:
//         console.log(`Unhandled event type: ${event.type}`);
//     }

//     res.status(200).json({ received: true });
//   } catch (error) {
//     console.error("Stripe webhook error:", error.message);
//     res.status(400).send(`Webhook Error: ${error.message}`);
//   }
// };

// // Handle Razorpay webhook and update MongoDB
// exports.handleRazorpayWebhook = async (req, res) => {
//   const signature = req.headers["x-razorpay-signature"];
//   const payload = req.body;

//   try {
//     const isValid = razorpayService.verifyWebhookSignature(payload, signature);

//     if (isValid) {
//       const event = payload.event;

//       switch (event) {
//         case "payment.captured":
//           const paymentData = payload.payload.payment.entity;
//           console.log("Payment captured:", paymentData.id);

//           // Update payment status in MongoDB
//           await Payment.findOneAndUpdate(
//             { paymentId: paymentData.id },
//             { status: "captured" }
//           );
//           break;
//         // Add more event types as needed
//         default:
//           console.log(`Unhandled event type: ${event}`);
//       }

//       res.status(200).json({ success: true });
//     } else {
//       res
//         .status(400)
//         .json({ success: false, message: "Invalid webhook signature" });
//     }
//   } catch (error) {
//     console.error("Razorpay webhook error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const RazorpayService = require("../services/payment/razorpayService");
const asyncHandler = require("../utils/asyncHandler");

const razorpayService = new RazorpayService();

// Create Razorpay Order
exports.createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const receipt = `receipt_${Date.now()}`;

  try {
    const order = await razorpayService.createOrder(amount, "INR", receipt);
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify Razorpay Payment
exports.verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const paymentDetails = req.body;

  try {
    const isValidSignature =
      razorpayService.verifyPaymentSignature(paymentDetails);

    if (isValidSignature) {
      // Save payment details to the database if needed
      // Example: Payment.create({ order_id, payment_id, status: "success" });
      res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Handle Razorpay Webhook
exports.handleRazorpayWebhook = asyncHandler(async (req, res) => {
  const payload = req.body;
  const signature = req.headers["x-razorpay-signature"];

  try {
    await razorpayService.handleWebhook(payload, signature);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
