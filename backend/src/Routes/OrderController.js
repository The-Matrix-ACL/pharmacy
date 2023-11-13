const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Cart = require("../Models/Cart");
const Patient = require("../Models/Patient");
const Order= require("../Models/Order");
const { requireAuth } = require('../Middleware/Auth.js');

router.post('/checkoutOrder/:cartid/:userid', async (req,res) => {
    const cartId = req.params.cartid;
    const userId = req.params.userid;

    const status = req.body.status;

    const cart = await Cart.findById(cartId);
    const user = await Patient.findById(userId);

    if(cart){
        const order = await Order.create({
            userId,
            items: cart.medications,
            bill: cart.bill,
            status: status
    })
    const data = await Cart.findByIdAndDelete(cartId);
    return res.status(201).send(order);
    }

    else{
        res.status(500).send("You do not have items in cart");
    }

});

module.exports = router;