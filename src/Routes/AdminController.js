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

    const pharmacist = await PharmacistRequest.findByIdAndDelete(pharmacistId);

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
  
      const patient = await Patient.findByIdAndDelete(patientId);
  
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

  const viewPatients = async (req, res) => {
    try {
      
      const patientInfo = await Patient.find();
      
      res.status(200).json(patientInfo);
    } catch (error) {
      console.error('Error fetching patient information:', error);
      res.status(500).json({ error: 'An error occurred while fetching patient information' });
    }
  };
  


const acceptPharmacistRequest = async (req, res) => {
  try {
    const pharmacistId = req.params.id;
    const { decision } = req.body;

    // Ensure that the decision is one of the allowed values
    if (!['approved', 'rejected', 'pending'].includes(decision)) {
      return res.status(400).json({ error: 'Invalid decision. Use "approved", "rejected", or "pending".' });
    }

    // Find the pharmacist request by ID
    const pharmacistRequest = await PharmacistRequest.findById(pharmacistId);

    if (!pharmacistRequest) {
      console.error('Pharmacist request not found:', pharmacistId);
      return res.status(404).json({ error: 'Pharmacist request not found' });
    }

    // Update the status based on the decision
    pharmacistRequest.status = decision;
    await pharmacistRequest.save();

    console.log(`Pharmacist request ${pharmacistId} ${decision}ed`);
    res.status(200).json({ message: `Pharmacist request ${pharmacistId} ${decision}ed successfully` });
  } catch (error) {
    console.error('Error accepting/rejecting pharmacist request:', error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
};




const adminchangepassword = async (req, res) => {
  const {currentPassword, newPassword } = req.body;
  const username=req.params.username;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    if (currentPassword !== admin.password) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error: 'Invalid new password. It must contain at least 8 characters, including 1 capital letter, 1 number, and 1 special character.',
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while changing the password' });
  }
};


module.exports = { deletePharmacist, deletePatient, addAdmin, viewPharmacistRequests, viewPatients, acceptPharmacistRequest,adminchangepassword };