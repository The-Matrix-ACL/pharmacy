const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    userId: {
        type: String,
        required: true,
      },
      addresses: [{
        addressTitle: {
            type: String,
            required: true
        },
        governate: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        buildingNumber: {
            type: Number,
            required: true
        },
        apartmentNumber: {
            type: Number,
            required: true
        }
      }

      ]

    })

    const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;