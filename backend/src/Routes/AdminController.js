const express = require("express");
//const bcrypt = require("bcrypt");
const router = express.Router();
const Admin = require("../Models/Admin.js");
const Pharmacist = require("../Models/Pharmacist.js"); // Import the Pharmacist model
const Patient = require("../Models/Patient.js"); // Import the Patient model
const nodemailer = require("nodemailer");
const OTP = require("../Models/OTP.js");
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
router.get("/viewMedicine/:name", async (req, res) => {
  const { name } = req.params;
  console.log(name);
  try {
    const med = await medicineModel.find({ name: name });
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
    const med = await medicineModel.find({ usage: usage });
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

router.get("/PatientInfo/:username", async (req, res) => {
  try {
    const patientUsername = req.params.username;
    const patientInfo = await Patient.findOne({ username: patientUsername });

    res.status(200).json(patientInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/AvailableMedicine", async (req, res) => {
  const Medications = await medicineModel.find();

  try {
    res.status(200).json(Medications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/verify", async (req, res) => {
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

module.exports = router;
