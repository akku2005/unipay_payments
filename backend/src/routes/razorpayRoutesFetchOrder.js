const express = require("express");
const RazorpayService = require("../services/payment/razorpayService");

const router = express.Router();
const razorpayService = new RazorpayService();

// Fetch Orders Route
router.get("/fetch-orders", async (req, res) => {
  try {
    // Call the Razorpay API to fetch orders
    const response = await razorpayService.fetchOrders();

    // Log the JSON response data
    console.log("Orders Data:", response);

    // Send the response back to the client
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
