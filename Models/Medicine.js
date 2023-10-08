const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  name: String,
  price: Double,
  ingredients: String,
  usage: String,
  description: String,
  picure: Image,
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
