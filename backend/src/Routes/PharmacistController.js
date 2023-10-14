const express = require("express");
//const bcrypt = require("bcrypt");
const router = express.Router();
//models
const Pharmacist = require("../Models/Pharmacist");
const medicineModel = require("../Models/Medicine");

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
router.patch("/editMed/:id", async (req, res) => {
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

module.exports = router;
// module.exports = { addMed };
