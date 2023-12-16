const express = require("express");
///const bcrypt = require("bcrypt");
const router = express.Router();
const Patient = require("../Models/Patient.js");
const AddressModel = require("../Models/DeliveryAddress.js");
const nodemailer = require("nodemailer");
const OTP = require("../Models/OTP.js");
const medicineModel = require("../Models/Medicine");

// Registration endpoint
router.post("/addPatient", async (req, res) => {
  console.log("a7a");
  const {
    username,
    name,
    email,
    password,
    dateOfBirth,
    gender,
    mobileNumber,
    emergencyContactName,
    emergencyMobileNumber,
    relation,
  } = req.body;

  try {
    const patient = await Patient.create({
      username,
      name,
      email,
      password,
      dateOfBirth,
      gender,
      mobileNumber,
      emergencyContactName,
      emergencyMobileNumber,
      relation,
    });
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/changepassword/:username", async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const username = req.params.username;
  console.log("Received request for patient username:", username);

  try {
    // Retrieve the patient from the database based on the username
    const patient = await Patient.findOne({ username });
    console.log("Retrieved patient from the database:", patient);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Check if the current password matches the stored password
    if (currentPassword !== patient.password) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    // Validate the new password using a regular expression
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error:
          "Invalid new password. It must contain at least 8 characters, including 1 capital letter, 1 number, and 1 special character.",
      });
    }

    // If all validations pass, update the patient's password
    patient.password = newPassword;
    await patient.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while changing the password" });
  }
});

const Address = require("../Models/DeliveryAddress");

const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

router.post("/addAddress/:username", async (req, res) => {
  const {
    addressTitle,
    governate,
    city,
    street,
    buildingNumber,
    apartmentNumber,
  } = req.body;
  const username = req.params.username;

  try {
    // Find the patient by username
    const patient = await Patient.findOne({ username });

    if (!patient) {
      console.error("Patient not found for username:", username);
      return res.status(404).json({ error: "Patient not found" });
    }

    // Create a new address object
    const newAddress = {
      addressTitle,
      governate,
      city,
      street,
      buildingNumber,
      apartmentNumber,
    };

    // Add the new address to the patient's addresses array
    patient.addresses.push(newAddress);

    // Save the patient with the new address
    await patient.save();

    // Create a new address document
    const addressDoc = new Address({
      userId: patient._id, // Set the userId to the patient's _id
      addresses: [newAddress], // Initialize the addresses array with the new address
    });

    // Save the address document
    await addressDoc.save();

    console.log("Delivery address added successfully");
    res.status(201).json({ message: "Delivery address added successfully" });
  } catch (error) {
    console.error("Error adding delivery address:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the delivery address" });
  }
});

router.get("/viewAddress/:username", async (req, res) => {
  const username = req.params.username;
  console.log("Received request for patient username:", username);
  try {
    // Retrieve patient information from the request or authentication token

    // Query the database for the patient's addresses
    const patient = await Patient.findOne({ username });
    console.log("Retrieved patient from the database:", patient);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Extract addresses from the patient document
    const addresses = patient.addresses || [];

    // Return the addresses as a response
    res.status(200).json({ addresses });
  } catch (error) {
    console.error("Error while fetching addresses:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching addresses" });
  }
});

router.put("/choosemainaddress/:username", async (req, res) => {
  const addressesId = req.params.id;
  const username = req.params.username;
  console.log("Address id :", addressesId);

  try {
    // Find the patient document based on the username
    const patient = await Patient.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Find the address document for the patient
    const addressDoc = await Address.findOne({ userId: patient._id });
    console.log("Patient Addresses:", addressDoc.addresses);

    if (!addressDoc) {
      return res
        .status(404)
        .json({ error: "Address not found for the patient" });
    }

    console.log("Before find. AddressId:", addressesId);
    console.log("Addresses before find:", addressDoc.addresses);

    const trimmedAddressId = addressesId.trim();
    const selectedAddress = addressDoc.addresses.find(
      (address) => address._id.toString() === trimmedAddressId
    );

    if (!selectedAddress) {
      return res.status(400).json({ error: "Invalid addressId" });
    }

    // Set the selected address as the main address
    addressDoc.mainAddress = selectedAddress._id;

    // Save the updated document
    await addressDoc.save();

    res.status(200).json({ message: "Main address updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the main address" });
  }
});

router.get("/viewMedicine/:name", async (req, res) => {
  const { name } = req.params;
  console.log(name);
  try {
    const med = await medicineModel.find({ archived: false });
    if (med.length === 0 || !med) {
      return res
        .status(404)
        .json({ message: "No medicine with this name on record" });
    }
    const results = await med.findOne({ name: name });
    if (results.quantity === 0) {
      results = await medicineModel.find({ ingredients: results.ingredients });
    }
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.get("/viewMedicine/filter/:usage", async (req, res) => {
  const { usage } = req.params;
  console.log(usage);
  try {
    const med = await medicineModel.find({ archived: false });
    if (med.length === 0 || !med) {
      return res
        .status(404)
        .json({ message: "No medicine with this name on record" });
    }
    const results = await med.find({ usage: usage });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/AvailableMedicine", async (req, res) => {
  try {
    const med = await medicineModel.find({ archived: false });
    if (!med) {
      return res.status(404).json({ error: "No available medicines found" });
    }
    return res.status(200).json(med);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
router.post("/AddAddress/:userid", async (req, res) => {
  const Id = req.params.userid;

  const {
    userId,
    addressTitle,
    governate,
    city,
    street,
    buildingNumber,
    apartmentNumber,
  } = req.body;

  try {
    const newAddress = await AddressModel.create({
      userId,
      addressTitle,
      governate,
      city,
      street,
      buildingNumber,
      apartmentNumber,
    });
    res.status(200).json(newAddress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//otps

router.put("/verify", async (req, res) => {
  try {
    console.log("ksomi");
    let { email, otp, newPassword } = req.body;
    const otpValidity = await verifyOTP({ email, otp });
    if (otpValidity) {
      const modifiedPatient = await Patient.findOneAndUpdate(
        { email },
        { password: newPassword }
      );
      console.log("=> " + modifiedPatient);
    }
    res.status(200).json({ valid: otpValidity });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//helper functions

const verifyOTP = async ({ email, otp }) => {
  try {
    if (!(email && otp)) {
      throw Error("Provide values for Email and OTP");
    }
    const matchedOTPRecord = await OTP.findOne({ email });
    if (!matchedOTPRecord) {
      throw Error("No OTP Record Found");
    }
    const { expiresAt } = matchedOTPRecord;
    if (expiresAt < Date.now()) {
      await OTP.deleteOne({ email });
      throw Error("OTP has expired. Please request another one");
    }
    const otpInRecord = matchedOTPRecord.otp;
    if (otpInRecord == otp) {
      return true;
    } else return false;
  } catch (error) {
    throw error;
  }
};

router.post("/requestOTP", async (req, res) => {
  try {
    console.log("f2");
    const { email } = req.body;
    const subject = "Email Verification";
    message = "Verify your email with the code below";
    duration = 1;
    const createdOTP = await sendOTP({
      email,
      subject,
      message,
      duration,
    });
    res.status(200).json(createdOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//helper functions
const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try {
    if (!(email && subject && message)) {
      throw error("provide values for email, subject and message");
    }
    await OTP.deleteOne({ email });
    const generatedOTP = await generateOTP();
    console.log(generatedOTP);
    const mailOptions = {
      from: "el7a2niYaMeleegy@hotmail.com",
      to: email,
      subject,
      html: `<p>${message}</p><p style="color:tomato; font-size:25px; letter-spacing:2px;"><b>${generatedOTP}</b></p>`,
    };
    await sendEmail(mailOptions);

    const newOTP = await new OTP({
      email,
      otp: generatedOTP,
      createdAT: Date.now(),
      expiresAt: Date.now() + 3600000 * +duration,
    });
    const createdOTPRecord = await newOTP.save();
    return createdOTPRecord;
  } catch (error) {
    throw error;
  }
};

const generateOTP = async () => {
  try {
    return `${Math.floor(1000 + Math.random() * 9000)}`;
  } catch (error) {
    throw error;
  }
};

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user: "el7a2niYaMeleegy@hotmail.com",
    pass: "PASSWORD12345678",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("ready for message");
    console.log(success);
  }
});

const sendEmail = async (mailOption) => {
  try {
    await transporter.sendMail(mailOption);
    return;
  } catch (error) {
    throw error;
  }
};

router.post("/getWalletCredit", async (req, res) => {
  const username = req.body.username; // Retrieve username from request body
  try {
    console.log("start");
    console.log(username);
    console.log("end");
    const user = await Patient.findOne({ username }); // Use the retrieved username
    console.log(user);
    await res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/payWithWallet", async (req, res) => {
  try {
    const { amount } = req.body;
    const username = req.body.username;
    const user = await Patient.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.WalletCredit < amount) {
      return res.status(400).json({ message: "Insufficient wallet credit" });
    }
    user.WalletCredit -= amount;
    const updatedUser = await user.save();
    res
      .status(200)
      .json({ success: true, newWalletCredit: updatedUser.WalletCredit });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request" });
  }
});

module.exports = router;
//module.exports = {  filterPatients,changepassword,addDeliveryAddress,viewAddress,chooseMainAddress};
