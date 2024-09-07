const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    razorpayPaymentId: {
      type: String,
      required: true,
    },
    razorpayOrderId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
