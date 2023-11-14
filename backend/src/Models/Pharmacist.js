const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  dateOfBirth: Date,
  hourlyRate: Number,
  affiliation: String,
  educationalBackground: String,
  /*id: File,
  degree: File,
  license: File,*/
});

const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);

module.exports = Pharmacist;
