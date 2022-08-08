const { StatusCodes } = require("http-status-codes");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "E-Shop",
    },
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, client_secret: myPayment.client_secret });
};

const sendStripeAPIKey = async (req, res) => {
  res.status(StatusCodes.OK).json({ stripeAPIKey: process.env.STRIPE_API_KEY });
};

module.exports = { processPayment, sendStripeAPIKey };
