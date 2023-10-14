const Admin = require('../Models/Admin');

const addAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the provided username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create a new administrator
    const admin = new Admin({ username, password });
    await admin.save();

    res.status(201).json({ message: 'Administrator added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the administrator' });
  }
};



const PharmacistRequest = require('../Models/Pharmacist'); // Import the Pharmacist model
const Patient = require('../Models/Patient'); // Import the Patient model

// Function to delete a pharmacist by ID
const deletePharmacist = async (req, res) => {
  

  try {
    const pharmacistId = req.params.id;

    const pharmacist = await PharmacistRequest.findByIdAndRemove(pharmacistId);

    if (!pharmacist) {
      console.error('Patient not found:', pharmacistId);
      return res.status(404).json({ error: 'Pharmacist not found' });
    }

    console.log('Pharmacist deleted:', pharmacistId);
    res.status(204).end(); // No content to return after successful deletion
  } catch (error) {
    console.error('Error deleting pharmacist:', error);
    res.status(500).json({ error: 'An error occurred while removing the pharmacist' });
  }
};

// Function to delete a patient by ID
 
    
const deletePatient = async (req, res) => {
    try {
      const patientId = req.params.id;
  
      const patient = await Patient.findByIdAndRemove(patientId);
  
      if (!patient) {
        console.error('Patient not found:', patientId);
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      console.log('Patient deleted:', patientId);
      res.status(204).end(); // No content to return after successful deletion
    } catch (error) {
      console.error('Error deleting patient:', error);
      res.status(500).json({ error: 'An error occurred while removing the patient' });
    }
  };
  
  const viewPharmacistRequests = async (req, res) => {
    try {
      // Assuming you have a model named PharmacistRequest to store pharmacist requests
      const pharmacistRequests = await PharmacistRequest.find();
      
      res.status(200).json(pharmacistRequests);
    } catch (error) {
      console.error('Error fetching pharmacist requests:', error);
      res.status(500).json({ error: 'An error occurred while fetching pharmacist requests' });
    }
  };
  

module.exports = { deletePharmacist, deletePatient, addAdmin,viewPharmacistRequests };

