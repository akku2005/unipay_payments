const crypto = require("crypto");
const Payment = require("../models/Payment"); // Assuming you have a Payment model

class WebhookService {
  async handleRazorpayWebhook(payload, signature) {
    try {
      // 1. Verify the webhook signature
      const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
      const generatedSignature = crypto
        .createHmac("sha256", secret)
        .update(JSON.stringify(payload))
        .digest("hex");

      if (generatedSignature !== signature) {
        throw new Error("Invalid webhook signature");
      }

      // 2. Process the payload based on the event type
      const { event, payload: eventPayload } = payload;

      switch (event) {
        case "payment.captured":
          await this.handlePaymentCaptured(eventPayload);
          break;
        case "payment.failed":
          await this.handlePaymentFailed(eventPayload);
          break;
        // Add more cases for other event types as needed
        default:
          console.log(`Unhandled event type: ${event}`);
      }
    } catch (error) {
      console.error("Error handling Razorpay webhook:", error);
      throw error; // You might want to handle this error in the controller
    }
  }

  async handlePaymentCaptured(paymentData) {
    const { id, amount, currency, status, order_id } = paymentData.entity;

    // Save payment data to MongoDB
    const payment = new Payment({
      razorpayPaymentId: id,
      amount,
      currency,
      status,
      razorpayOrderId: order_id,
    });

    await payment.save();
  }

  async handlePaymentFailed(paymentData) {
    const { id, amount, currency, status, order_id } = paymentData.entity;

    // Update payment status in MongoDB or take any necessary action
    await Payment.updateOne({ razorpayPaymentId: id }, { $set: { status } });
  }
}

module.exports = WebhookService;
