const WebhookService = require("../services/webhookService");
const asyncHandler = require("../utils/asyncHandler");

const webhookService = new WebhookService();

exports.handleRazorpayWebhook = asyncHandler(async (req, res) => {
  const payload = req.body;
  const signature = req.headers["x-razorpay-signature"];

  try {
    await webhookService.handleRazorpayWebhook(payload, signature);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
