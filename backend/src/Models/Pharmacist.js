const mongoose = require("mongoose");

const pharmacistRequestSchema = new mongoose.Schema(
  {
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
    hourlyRate: {
      type: Number,
      required: true,
    },
    affiliation: {
      type: String,
      required: true,
    },
    educationalBackground: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    WalletCredit: {
      type: Number,
      default: 0, // Set an initial value, change as needed
    },
  },
  { timestamps: true }
);

const PharmacistRequest = mongoose.model(
  "PharmacistRequest",
  pharmacistRequestSchema
);

// Update existing documents to include the 'WalletCredit' field
PharmacistRequest.updateMany(
  { WalletCredit: { $exists: false } },
  { $set: { WalletCredit: 0 } }
)
  .then((result) => {
    console.log("Documents updated successfully:", result);
  })
  .catch((err) => {
    console.error("Error updating documents:", err);
  });

module.exports = PharmacistRequest;
