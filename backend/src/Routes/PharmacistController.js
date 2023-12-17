const express = require("express");
//const bcrypt = require("bcrypt");
const router = express.Router();
//models
const Pharmacist = require("../Models/Pharmacist");
const medicineModel = require("../Models/Medicine");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const nodemailer = require("nodemailer");
const OTP = require("../Models/OTP.js");
var cors = require("cors");

var app = express();
app.use(cors());

// Registration endpoint for pharmacists
router.post("/submitPharmacistRequest"),
  async (req, res) => {
    const {
      username,
      name,
      email,
      password,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
    } = req.body;

    try {
      const request = await Pharmacist.create({
        username,
        name,
        email,
        password,
        dateOfBirth,
        hourlyRate,
        affiliation,
        educationalBackground,
      });
      res.status(201).json({
        message: "Pharmacist registration request submitted successfully",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

router.post("/pharmacistchangepassword/:username"),
  async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const username = req.params.username;

    try {
      const request = await Pharmacist.findOne({ username });

      if (!request) {
        return res.status(404).json({ error: "Pharmacist not found" });
      }

      if (currentPassword !== request.password) {
        return res.status(401).json({ error: "Invalid current password" });
      }

      const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          error:
            "Invalid new password. It must contain at least 8 characters, including 1 capital letter, 1 number, and 1 special character.",
        });
      }

      request.password = newPassword;
      await request.save();

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while changing the password" });
    }
  };

//add medicine to DB
router.post("/addMed", async (req, res) => {
  const {
    name,
    price,
    ingredients,
    usage,
    description,
    picture,
    amount,
    sales,
  } = req.body;

  try {
    const newMed = await medicineModel.create({
      name,
      price,
      ingredients,
      usage,
      description,
      picture,
      amount,
      sales,
    });
    res.status(200).json(newMed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//edit medicine details and price
router.post("/AvailableMedicinePharmacist/editMed/:id", async (req, res) => {
  const id = req.params.id;
  const {
    name,
    price,
    ingredients,
    usage,
    description,
    picture,
    amount,
    sales,
  } = req.body;

  try {
    const med = await medicineModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        price,
        ingredients,
        usage,
        description,
        picture,
        amount,
        sales,
      }
    );
    res.status(200).json(med);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/AvailableMedicinePharmacist/archiveMed/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const med = await medicineModel.findOne({ _id: id });
    const arch = med.archived;
    const result = await medicineModel.findByIdAndUpdate(
      { _id: id },
      { archived: !arch }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/viewMedicine/:name", async (req, res) => {
  const { name } = req.params;
  console.log(name);
  try {
    const med = await medicineModel.find({ name: name });
    if (!med) {
      return res
        .status(404)
        .json({ message: "No medicine with this name on record" });
    }
    res.status(200).json(med);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});
router.get("/viewMedicine/filter/:usage", async (req, res) => {
  const { usage } = req.params;
  console.log(usage);
  try {
    const med = await medicineModel.find({
      usage: usage,
    });
    if (!med) {
      return res
        .status(404)
        .json({ message: "No medicine with this use on record" });
    }
    res.status(200).json(med);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});
router.get("/ViewMedQuantityAndSales", async (req, res) => {
  const Medications = await medicineModel.find(
    {},
    { _id: 0, amount: 1, sales: 1 }
  );

  try {
    res.status(200).json(Medications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/AvailableMedicinePharmacist", async (req, res) => {
  const Medications = await medicineModel.find();

  try {
    res.status(200).json(Medications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/ViewMedQuantityAndSales", async (req, res) => {
  const Medications = await medicineModel.find(
    {},
    { _id: 0, amount: 1, sales: 1 }
  );

  try {
    res.status(200).json(Medications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/viewMedicineById/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const med = await medicineModel.findById(id);
    res.json(med);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//Upload medicine image
//Upload medicine image

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.route("/addPhoto/:id").post(upload.single("photo"), async (req, res) => {
  const id = req.params.id;

  try {
    const med = await medicineModel.findOneAndUpdate(
      { _id: id },
      {
        picture: photo,
      }
    );
    res.status(200).json(med);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//otp

router.put("/verify", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const otpValidity = await verifyOTP({ email, otp });
    Console.log(otpValidity);
    if (otpValidity) {
      const modifiedPharmacist = await Pharmacist.findOneAndUpdate(
        { email: email },
        { password: newPassword }
      );
    }
    Console.log(otpValidity);
    res.status(200).json({ valid: otpValidity });
  } catch (error) {
    console.log("aaa");
    res.status(400).send(error.message);
  }
});

//helper functions

const verifyOTP = async ({ email, otp }) => {
  try {
    if (!(email && otp)) {
      throw Error("Provide values for Email and OTP");
    }

    const matchedOTPRecord = await OTP.findOne({ email: email });

    if (!matchedOTPRecord) {
      throw Error("No OTP Record Found");
    }

    const { expiresAt } = matchedOTPRecord;
    if (expiresAt < Date.now()) {
      await OTP.deleteOne({ email: email });
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
  console.log("pharmacist is ok");
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

const Sales = require("../Models/Sales");

router.get("/pharmacistViewSales", async (req, res) => {
  try {
    const pharmacistUsername = req.params.username; // Assuming the pharmacist's username is part of the URL parameter
    const { year, month } = req.query; // Extracting the year and month from query parameters

    // Validate year and month parameters
    if (!year || !month) {
      return res
        .status(400)
        .json({ error: "Year and month are required parameters" });
    }

    const startOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
    const endOfMonth = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59);

    // Query sales records for the specified month and pharmacist
    const monthlySales = await Sales.find({
      saleDate: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
      pharmacist: pharmacistUsername, // Assuming you have a field in Sales model to track the pharmacist
    });

    // Calculate total sales for the month
    const totalSales = monthlySales.reduce(
      (sum, sale) => sum + sale.totalAmount,
      0
    );

    res.json({ totalSales, monthlySales });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching sales data" });
  }
});

router.post("/addsalesinfo", async (req, res) => {
  try {
    const { medicine, quantitySold, totalAmount, saleDate } = req.body;

    // Validate required fields
    if (!medicine || !quantitySold || !totalAmount || !saleDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new sales entry
    const newSale = await Sales.create({
      medicine,
      quantitySold,
      totalAmount,
      saleDate,
    });

    res
      .status(201)
      .json({ message: "Sales information added successfully", sale: newSale });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding sales information" });
  }
});

router.post("/filtersales", async (req, res) => {
  try {
    const { medicine, startDate, endDate } = req.body; // Use req.body instead of req.query

    // Build the query based on the provided parameters
    const query = {};
    if (medicine) {
      query.medicine = medicine;
    }
    if (startDate && endDate) {
      query.saleDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Query sales records based on the constructed query
    const filteredSales = await Sales.find(query);

    res.json({ filteredSales });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while filtering sales report" });
  }
});

router.post("/PharmacistGetWalletCredit", async (req, res) => {
  const username = req.body.username; // Retrieve username from request body
  try {
    console.log("start");
    console.log(username);
    console.log("end");
    const user = await Pharmacist.findOne({ username }); // Use the retrieved username
    console.log(user);
    await res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
//module.exports = { createPharmacistRequest, pharmacistchangepassword };
