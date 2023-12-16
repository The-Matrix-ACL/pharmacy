const { default: mongoose } = require('mongoose');
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const PharmacistRequest = require('../Models/Pharmacist'); // Import the Pharmacist model
const Patient = require('../Models/Patient'); // Import the Patient model
const Admin = require('../Models/Admin');


const login = async (req, res) => {
  try {
    const { username, password, userType } = req.body;

    let userModel;
    let isPharmacistRequest = false;

    switch (userType) {
      case 'admin':
        userModel = Admin;
        break;
      case 'patient':
        userModel = Patient;
        break;
      case 'pharmacist':
        userModel = PharmacistRequest;
        isPharmacistRequest = true;
        break;
      default:
        return res.status(400).json({ error: 'Invalid user type' });
    }

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed: User not found' });
    }

    if (isPharmacistRequest && user.status !== 'approved') {
      return res.status(401).json({ message: 'Authentication failed: Pharmacist request not approved' });
    }

    // Directly compare plaintext passwords
    if (password !== user.password) {
      return res.status(401).json({ message: 'Authentication failed: Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id, username, userType }, 'your-secret-key', { expiresIn: '1h' });

    // Return the token, user type, username, and userId
    res.status(200).json({ token, userType, username, userId: user._id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
}

const logout = (req, res) => {
  try {
    // Clear the authentication token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userType');

    // Redirect the user to the login page or any other desired page
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'An error occurred during logout' });
  }
};

module.exports = { login, logout };