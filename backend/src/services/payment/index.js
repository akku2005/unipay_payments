const RazorpayService = require("./razorpayService");
const StripeService = require("./stripeService");

class PaymentService {
  constructor(gateway) {
    switch (gateway) {
      case "razorpay":
        this.gateway = new RazorpayService();
        break;
      case "stripe":
        this.gateway = new StripeService();
        break;
      default:
        throw new Error("Invalid payment gateway");
    }
  }

  async createPayment(amount, currency, metadata = {}) {
    try {
      return await this.gateway.createOrder(amount, currency, metadata);
    } catch (error) {
      throw new Error(`Payment creation failed: ${error.message}`);
    }
  }

  async verifyPayment(paymentDetails) {
    try {
      return await this.gateway.verifyPayment(paymentDetails);
    } catch (error) {
      throw new Error(`Payment verification failed: ${error.message}`);
    }
  }

  async handleWebhook(payload, signature) {
    try {
      return await this.gateway.handleWebhook(payload, signature);
    } catch (error) {
      throw new Error(`Webhook handling failed: ${error.message}`);
    }
  }
}

module.exports = PaymentService;
