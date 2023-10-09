const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Double,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    usage: {
      trype: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: Image,
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
