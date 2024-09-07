// const Razorpay = require("razorpay");
// const crypto = require("crypto");

// class RazorpayService {
//   constructor() {
//     this.razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });
//   }

//   async createOrder(amount, currency, receipt) {
//     const options = {
//       amount: amount * 100, // Amount in paisa
//       currency,
//       receipt,
//     };

//     return this.razorpay.orders.create(options);
//   }

//   verifyPaymentSignature(paymentDetails) {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       paymentDetails;

//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     return generatedSignature === razorpay_signature;
//   }

//   async handleWebhook(payload, signature) {
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(JSON.stringify(payload))
//       .digest("hex");

//     if (generatedSignature !== signature) {
//       throw new Error("Invalid webhook signature");
//     }

//     // Handle the webhook payload
//     // Example: Save the payment status to your database
//   }
// }

// module.exports = RazorpayService;

const Razorpay = require("razorpay");
const crypto = require("crypto");

class RazorpayService {
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  async createOrder(amount, currency, receipt) {
    const options = {
      amount: amount * 100, // Amount in paisa
      currency,
      receipt,
    };

    try {
      const order = await this.razorpay.orders.create(options);
      console.log("Order Created:", order);
      return order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  verifyPaymentSignature(paymentDetails) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      paymentDetails;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Log the generated signature and received signature for debugging
    console.log("Generated Signature:", generatedSignature);
    console.log("Received Signature:", razorpay_signature);

    return generatedSignature === razorpay_signature;
  }

  async handleWebhook(payload, signature) {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(JSON.stringify(payload))
      .digest("hex");

    if (generatedSignature !== signature) {
      throw new Error("Invalid webhook signature");
    }

    // Handle the webhook payload
  }

  // Method to fetch orders from Razorpay
  async fetchOrders() {
    try {
      const orders = await this.razorpay.orders.all(); // Fetch all orders
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }
}

module.exports = RazorpayService;
