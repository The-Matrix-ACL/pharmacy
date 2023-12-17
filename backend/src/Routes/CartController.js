const express = require("express");
const bodyParser = require("body-parser");
const Cart = require("../Models/Cart.js");
const Medicine = require("../Models/Medicine");
const router = express.Router();
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");

//add back requireAuth
router.get("/patient/getCart/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.medications.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.post("/addToCart/:userid/:medid", async (req, res) => {
  const userId = req.params.userid;
  const medId = req.params.medid;
  const { quantity } = 1;

  try {
    let cart = await Cart.findOne({ userId: userId });
    const med = await Medicine.findById(medId);
    if (!med) {
      res.status(404).send("Item not found!");
    }

    const price = med.price;
    const name = med.name;

    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.medications.findIndex((p) => p.medId == medId);

      // Check if product exists or not
      if (itemIndex > -1) {
        return res.json("Item already in cart");
      } else {
        cart.medications.push({ medId, name, quantity, price });
      }
      cart.bill += price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        medications: [{ medId, name, quantity, price }],
        bill: price,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.delete("/deleteCartItem/:cartid/:medid", async (req, res) => {
  const cartId = req.params.cartid;
  const medId = req.params.medid;

  let cart = await Cart.findById(cartId);

  cart = await cart.deleteOne({ medId: medId });

  return res.status(200).send(cart);
});

router.post("/updateQuantity/:cartid/:medid", async (req, res) => {
  const cartId = req.params.cartid;
  const medId = req.params.medid;

  const { quantity } = req.body;
  try {
    let cart = await Cart.findById(cartId);
    const med = await Medicine.findById(medId);

    const price = med.price;

    let itemIndex = cart.medications.findIndex((p) => p.medId == medId);

    if (itemIndex > -1) {
      let productItem = cart.medications[itemIndex];
      productItem.quantity += quantity;
      cart.medications[itemIndex] = productItem;
    }

    cart.bill += quantity * price;
    cart = await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
