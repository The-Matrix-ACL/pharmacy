const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema(
  {
    medicine: {
        type: String,
        required: true,
      },
    quantitySold: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    saleDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
