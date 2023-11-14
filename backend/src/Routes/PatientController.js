const express = require("express");
///const bcrypt = require("bcrypt");
const router = express.Router();
const Patient = require("../Models/Patient.js");
const AddressModel = require("../Models/DeliveryAddress.js")


// Registration endpoint
const createPatient = async (req, res) => {
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
};

const filterPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const changepassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const username = req.params.username;
  console.log('Received request for patient username:', username);

  try {
    // Retrieve the patient from the database based on the username
    const patient = await Patient.findOne({ username});
    console.log('Retrieved patient from the database:', patient);


    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check if the current password matches the stored password
    if (currentPassword !== patient.password) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    // Validate the new password using a regular expression
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error: 'Invalid new password. It must contain at least 8 characters, including 1 capital letter, 1 number, and 1 special character.',
      });
    }

    // If all validations pass, update the patient's password
    patient.password = newPassword;
    await patient.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while changing the password' });
  }
};

module.exports = { changepassword };



const Address = require('../Models/DeliveryAddress');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const addDeliveryAddress = async (req, res) => {
  const { addressTitle, governate, city, street, buildingNumber, apartmentNumber } = req.body;
  const username = req.params.username;

  try {
    // Find the patient by username
    const patient = await Patient.findOne({ username });

    if (!patient) {
      console.error('Patient not found for username:', username);
      return res.status(404).json({ error: 'Patient not found' });
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

    console.log('Delivery address added successfully');
    res.status(201).json({ message: 'Delivery address added successfully' });
  } catch (error) {
    console.error('Error adding delivery address:', error);
    res.status(500).json({ error: 'An error occurred while adding the delivery address' });
  }
};





const viewAddress = async (req, res) => {
  const username = req.params.username;
  console.log('Received request for patient username:', username);
  try {
    // Retrieve patient information from the request or authentication token

    // Query the database for the patient's addresses
    const patient = await Patient.findOne({ username});
    console.log('Retrieved patient from the database:', patient);



    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Extract addresses from the patient document
    const addresses = patient.addresses || [];

    // Return the addresses as a response
    res.status(200).json({ addresses });
  } catch (error) {
    console.error('Error while fetching addresses:', error);
    res.status(500).json({ error: 'An error occurred while fetching addresses' });
  }
};

const chooseMainAddress = async (req, res) => {
  const  addressesId  = req.params.id;
  const username = req.params.username;
  console.log('Address id :',addressesId);

  try {
    // Find the patient document based on the username
    const patient = await Patient.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Find the address document for the patient
    const addressDoc = await Address.findOne({ userId: patient._id });
    console.log('Patient Addresses:', addressDoc.addresses);


    if (!addressDoc) {
      return res.status(404).json({ error: 'Address not found for the patient' });
    }

    console.log('Before find. AddressId:', addressesId);
    console.log('Addresses before find:', addressDoc.addresses);
    
    const trimmedAddressId = addressesId.trim();
    const selectedAddress = addressDoc.addresses.find(address => address._id.toString() === trimmedAddressId);

    
    

    if (!selectedAddress) {
      return res.status(400).json({ error: 'Invalid addressId' });
    }

    // Set the selected address as the main address
    addressDoc.mainAddress = selectedAddress._id;

    // Save the updated document
    await addressDoc.save();

    res.status(200).json({ message: 'Main address updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the main address' });
  }
};

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

router.get ("/AvailableMedicine" , async (req, res) => {
  const Medications = await medicineModel.find();
  
  try{
  res.status(200).json(Medications);
 }
 catch(error) {
    res.status(400).json({ error: error.message });
  }

 });

router.post("/AddAddress/:userid", async(req,res)=>{
  const Id = req.params.userid;

   const {
    userId,
    addressTitle,
    governate,
    city,
    street,
    buildingNumber,
    apartmentNumber
  } = req.body;

  try {
    const newAddress = await AddressModel.create({
      userId,
      addressTitle,
      governate,
      city,
      street,
      buildingNumber,
      apartmentNumber
    });
    res.status(200).json(newAddress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

module.exports = router;
module.exports = { createPatient, filterPatients,changepassword,addDeliveryAddress,viewAddress,chooseMainAddress};
