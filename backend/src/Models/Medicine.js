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
      type: Number,
      required: true,
    },
    //Active and their dosage
    ingredients: {
      type: String,
      required: true,
    },
    //Class of Pharmaceuticals
    usage: {
      type: String,
      required: true,
    },
    //Why using and how
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
    prescriped: {
      type: Boolean,
      required: true,
      default: false,
    },
    archived: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
