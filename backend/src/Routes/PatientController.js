const express = require("express");
///const bcrypt = require("bcrypt");
const router = express.Router();
const Patient = require("../Models/Patient.js");
const AddressModel = require("../Models/DeliveryAddress.js");

// Registration endpoint
router.post("/register", async (req, res) => {
  try {
    const {
      username,
      name,
      email,
      password,
      dateOfBirth,
      gender,
      mobileNumber,
      emergencyContact,
    } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new Patient({
      username,
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
      mobileNumber,
      emergencyContact,
    });

    await newPatient.save();
    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
    const results = await med.find({ name: name });
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
  const med = await medicineModel.find({ archived: false });
  const results = await med.find();
  res.status(200).json(results);
  try {
    res.status(200).json(Medications);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

module.exports = router;
