const express = require("express");
//const bcrypt = require("bcrypt");
const router = express.Router();
//models
const Pharmacist = require("../Models/Pharmacist");
const medicineModel = require("../Models/Medicine");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
let User = require("../models/User.js");

// Registration endpoint for pharmacists
router.post("/register", async (req, res) => {
  try {
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

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPharmacist = new Pharmacist({
      username,
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
    });

    await newPharmacist.save();
    res.status(201).json({
      message: "Pharmacist registration request submitted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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
router.post("/AvailableMedicine/editMed/:id", async (req, res) => {
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
    prescriped,
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
        prescriped,
      }
    );
    res.status(200).json(med);
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

router.get("/AvailableMedicine", async (req, res) => {
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

module.exports = router;
