const Pharmacist = require('../Models/Pharmacist');

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

const pharmacistchangepassword = async (req, res) => {
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



module.exports = { createPharmacistRequest, pharmacistchangepassword };
