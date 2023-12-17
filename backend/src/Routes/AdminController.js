const express = require("express");
//const bcrypt = require("bcrypt");
const Admin = require("../Models/Admin");
const nodemailer = require("nodemailer");
const OTP = require("../Models/OTP.js");
const PharmacistRequest = require("../Models/Pharmacist.js"); // Import the Pharmacist model
const Patient = require("../Models/Patient"); // Import the Patient model

const addAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the provided username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create a new administrator
    const admin = new Admin({ username, password });
    await admin.save();

    res.status(201).json({ message: "Administrator added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the administrator" });
  }
};

// Function to delete a pharmacist by ID
const deletePharmacist = async (req, res) => {
  try {
    const pharmacistId = req.params.id;

    const pharmacist = await PharmacistRequest.findByIdAndDelete(pharmacistId);

    if (!pharmacist) {
      console.error("Patient not found:", pharmacistId);
      return res.status(404).json({ error: "Pharmacist not found" });
    }

    console.log("Pharmacist deleted:", pharmacistId);
    res.status(204).end(); // No content to return after successful deletion
  } catch (error) {
    console.error("Error deleting pharmacist:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing the pharmacist" });
  }
};

// Function to delete a patient by ID

const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    const patient = await Patient.findByIdAndDelete(patientId);

    if (!patient) {
      console.error("Patient not found:", patientId);
      return res.status(404).json({ error: "Patient not found" });
    }

    console.log("Patient deleted:", patientId);
    res.status(204).end(); // No content to return after successful deletion
  } catch (error) {
    console.error("Error deleting patient:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing the patient" });
  }
};

const viewPharmacistRequests = async (req, res) => {
  try {
    // Assuming you have a model named PharmacistRequest to store pharmacist requests
    const pharmacistRequests = await PharmacistRequest.find();

    res.status(200).json(pharmacistRequests);
  } catch (error) {
    console.error("Error fetching pharmacist requests:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching pharmacist requests" });
  }
};

const viewPatients = async (req, res) => {
  try {
    const patientInfo = await Patient.find();

    res.status(200).json(patientInfo);
  } catch (error) {
    console.error("Error fetching patient information:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching patient information" });
  }
};

const acceptPharmacistRequest = async (req, res) => {
  try {
    const pharmacistId = req.params.id;
    const { decision } = req.body;

    // Ensure that the decision is one of the allowed values
    if (!["approved", "rejected", "pending"].includes(decision)) {
      return res.status(400).json({
        error: 'Invalid decision. Use "approved", "rejected", or "pending".',
      });
    }

    // Find the pharmacist request by ID
    const pharmacistRequest = await PharmacistRequest.findById(pharmacistId);

    if (!pharmacistRequest) {
      console.error("Pharmacist request not found:", pharmacistId);
      return res.status(404).json({ error: "Pharmacist request not found" });
    }

    // Update the status based on the decision
    pharmacistRequest.status = decision;
    await pharmacistRequest.save();

    console.log(`Pharmacist request ${pharmacistId} ${decision}ed`);
    res.status(200).json({
      message: `Pharmacist request ${pharmacistId} ${decision}ed successfully`,
    });
  } catch (error) {
    console.error("Error accepting/rejecting pharmacist request:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
};

const adminchangepassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const username = req.params.username;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    if (currentPassword !== admin.password) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error:
          "Invalid new password. It must contain at least 8 characters, including 1 capital letter, 1 number, and 1 special character.",
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while changing the password" });
  }
};

//otp

const verify = async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;
    const otpValidity = await verifyOTP({ email, otp });
    if (otpValidity) {
      const modifiedAdmin = await Admin.findOneAndUpdate(
        { email },
        { password: newPassword }
      );
    }
    res.status(200).json({ valid: otpValidity });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

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
    res.status(500).json({ error: error.message });
  }
};

const getMedicineByName = async (req, res) => {
  const { name } = req.params;
  console.log(name);
  try {
    const med = await medicineModel.find({ name: name });
    if (med.length === 0 || !med) {
      return res
        .status(404)
        .json({ message: "No medicine with this name on record" });
    }
    res.status(200).json(med);
  } catch (error) {
    throw error;
  }
};

const requestOTP = async (req, res) => {
  try {
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
};

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
    console.error(error);
    res.status(400).json(error);
  } catch (error) {
    throw error;
  }
};
const filterMedicineByUsage = async (req, res) => {
  const { usage } = req.params;
  console.log(usage);
  try {
    const med = await medicineModel.find({ usage: usage });
    if (med.length === 0 || !med) {
      return res
        .status(404)
        .json({ message: "No medicine with this use on record" });
    }
    res.status(200).json(med);
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

module.exports = {
  deletePharmacist,
  deletePatient,
  addAdmin,
  viewPharmacistRequests,
  viewPatients,
  acceptPharmacistRequest,
  adminchangepassword,
  verify,
  requestOTP,
  filterMedicineByUsage,
  getMedicineByName,
};
