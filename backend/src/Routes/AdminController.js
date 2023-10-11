const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Admin = require("../Models/Admin.js");
const Pharmacist = require("../Models/Pharmacist.js"); // Import the Pharmacist model
const Patient = require("../Models/Patient.js"); // Import the Patient model

// Registration endpoint for admins
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if an admin with the same username already exists
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove a pharmacist by ID
router.delete("/removePharmacist/:id", async (req, res) => {
  try {
    const pharmacistId = req.params.id;
    const removedPharmacist = await Pharmacist.findByIdAndRemove(pharmacistId);

    if (!removedPharmacist) {
      return res.status(404).json({ message: "Pharmacist not found" });
    }

    res.json({ message: "Pharmacist removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove a patient by ID
router.delete("/removePatient/:id", async (req, res) => {
  try {
    const patientId = req.params.id;
    const removedPatient = await Patient.findByIdAndRemove(patientId);

    if (!removedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// View all pharmacist registration information
router.get("/pharmacistRegistrationInfo", async (req, res) => {
  try {
    const pharmacistInfo = await Pharmacist.find({}, "-password"); // Exclude the password field

    if (!pharmacistInfo || pharmacistInfo.length === 0) {
      return res
        .status(404)
        .json({ message: "No pharmacist registration information found" });
    }

    res.json(pharmacistInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//view a pharmacist by username
router.get("/viewPharmacist", async (req, res) => {
  const { pharmacistUsername } = req.body;
  console.log(pharmacistUsername);
  try {
    const pharmacistInfo = await Pharmacist.find(
      { username: pharmacistUsername },
      "-password"
    ); // Exclude the password field
    if (!pharmacistInfo || pharmacistInfo.length === 0) {
      return res
        .status(404)
        .json({ message: "No pharmacist with this username on record" });
    }
    res.json(pharmacistInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
