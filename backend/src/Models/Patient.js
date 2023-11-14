const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  emergencyContactName: {
      type: String,
      required: true,
    },
  emergencyMobileNumber: {
     type: String,
     required: true,
   },
  relation: {
      type: String,
      required: true,
    },
  addresses: [{
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
  }],
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

// Update existing documents to include the 'addresses' field
Patient.updateMany({ addresses: { $exists: false } }, { $set: { addresses: [] } })
  .then((result) => {
    console.log('Documents updated successfully:', result);
  })
  .catch((err) => {
    console.error('Error updating documents:', err);
  });

module.exports = Patient;
