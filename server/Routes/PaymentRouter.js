const express = require("express");
const router = express.Router();

const {
  processPayment,
  sendStripeAPIKey,
} = require("../Controllers/PaymentController");
const { authMiddleware } = require("../Middlewares/auth");

router.route("/payment/process").post(authMiddleware, processPayment);
router.route("/stripeapikey").get(authMiddleware, sendStripeAPIKey);

module.exports = router;
