const express = require("express");
//const bcrypt = require("bcrypt");
const router = express.Router();
//models
const Pharmacist = require("../Models/Pharmacist");
const medicineModel = require("../Models/Medicine");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let User = require('../models/User.js');

// Registration endpoint for pharmacists
router.post("/submitPharmacistRequest"),async (req, res) => {
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
    res.status(201).json({ message: 'Pharmacist registration request submitted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

router.post("/pharmacistchangepassword/:username"),async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const username = req.params.username;

  try {
    const request = await Pharmacist.findOne({ username });

    if (!request) {
      return res.status(404).json({ error: 'Pharmacist not found' });
    }

    if (currentPassword !== request.password) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error: 'Invalid new password. It must contain at least 8 characters, including 1 capital letter, 1 number, and 1 special character.',
      });
    }

    request.password = newPassword;
    await request.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while changing the password' });
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
    const id  = req.params.id;
   
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
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.route('/addPhoto/:id').post(upload.single('photo'), async (req, res) => {
  
  const id  = req.params.id;

  try{
  const med = await medicineModel.findOneAndUpdate(
    { _id: id },
    {
      picture: photo
    }
  );
  res.status(200).json(med);
} catch (error) {
  res.status(400).json({ error: error.message });
}


});


  

module.exports = router;
//module.exports = { createPharmacistRequest, pharmacistchangepassword };


