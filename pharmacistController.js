const PharmacistRequest = require('../Models/Pharmacist');

const createPharmacistRequest = async (req, res) => {
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
    const request = await PharmacistRequest.create({
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

module.exports = { createPharmacistRequest };
