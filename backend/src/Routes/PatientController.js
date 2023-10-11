const express = require("express");
///const bcrypt = require("bcrypt");
const router = express.Router();
const Patient = require("../Models/Patient.js");

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
    const med = await Medicine.find({ name: name });
    if (med.length === 0 || !med) {
      return res
        .status(404)
        .json({ message: "No medicine with this name on record" });
    }
    res.json(med);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.get("/viewMedicine/filter/:usage", async (req, res) => {
  const { usage } = req.params;
  console.log(usage);
  try {
    const med = await Medicine.find({ usage: usage });
    if (med.length === 0 || !med) {
      return res
        .status(404)
        .json({ message: "No medicine with this use on record" });
    }
    res.json(med);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
