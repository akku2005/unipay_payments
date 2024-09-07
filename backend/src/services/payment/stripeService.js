const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class StripeService {
  async createPaymentIntent(amount, currency, metadata = {}) {
    return await stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      metadata,
    });
  }

  verifyWebhook(payload, signature) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    return stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  }
}

module.exports = StripeService;
