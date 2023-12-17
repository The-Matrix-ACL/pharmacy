const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Cart = require("../Models/Cart");
const Patient = require("../Models/Patient");
const Order = require("../Models/Order");

//const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const { requireAuth } = require("../Middleware/authMiddleware.js");

router.post("/checkoutOrder/:userid", async (req, res) => {
  const userId = req.params.userid;

  const status = req.body.status;

  const cart = await Cart.findOne({ userId: userId });
  const user = await Patient.findById(userId);

  if (cart) {
    const order = await Order.create({
      userId,
      items: cart.medications,
      bill: cart.bill,
      status: "Placed",
    });

    await Cart.findOneAndDelete({ userId: userId });
    return res.status(201).send(order);
  } else {
    res.status(500).send("You do not have items in cart");
  }
});

/*
router.post("/checkoutOrder/payment/:userid", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});
*/

router.post("/viewOrder/:userid", async (req, res) => {
  const userId = req.params.userid;
  console.log("ugh");

  const orders = await Order.find({ userId: userId }).select(
    "name items status bill"
  );
  if (orders.length > 0) {
    const orderData = orders.map((order) => {
      return {
        name: order.name,
        items: order.items,
        status: order.status,
        bill: order.bill,
      };
    });
    return res.status(200).json(orderData);
  } else {
    return res.status(404).send("No orders placed");
  }
});

router.delete("/viewOrder/cancelOrder/:userid", async (req, res) => {
  const userId = req.params.userid;
  const order = Order.findOne({ userId: userId });
  if (!order) {
    return res.status(404).send("No orders to delete");
  } else if (order.status.localeCompare("Delivered") != 0) {
    const delOrder = Order.findOneAndDelete({ userid: userId });
    return res.status(200).send("cancelation complete");
  } else {
    return res.status(400).send("Order delivered, can not cancel.");
  }
});

module.exports = router;
