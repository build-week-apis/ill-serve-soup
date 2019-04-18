const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");

const router = express.Router();

const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

router.get("/api/payment", (req, res) => {
  res.send({
    message: "Hello Stripe checkout server!",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
