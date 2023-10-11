const { Router } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/*
      name,
      price,
      ingredients,
      usage,
      description,
      picture,
      amount,
      sales,
*/
const medicineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    usage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    sales: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
