const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Patient = require('./Patient'); 

const AddressSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Patient,
    required: true,
  },
  addresses: [
    {
      addressTitle: {
        type: String,
        required: true,
      },
      governate: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      buildingNumber: {
        type: Number,
        required: true,
      },
      apartmentNumber: {
        type: Number,
        required: true,
      },
      isMain: {
        type: Boolean,
        default: false,
      },
    },
  ],
});


const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;
