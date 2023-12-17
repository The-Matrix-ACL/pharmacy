const PharmacistRequest = require('../Models/Pharmacist');
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
const Sales = require('../Models/Sales');

const pharmacistViewSales = async (req, res) => {
  try {
    const pharmacistUsername = req.params.username; // Assuming the pharmacist's username is part of the URL parameter
    const { year, month } = req.query; // Extracting the year and month from query parameters

    // Validate year and month parameters
    if (!year || !month) {
      return res.status(400).json({ error: 'Year and month are required parameters' });
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
    const totalSales = monthlySales.reduce((sum, sale) => sum + sale.totalAmount, 0);

    res.json({ totalSales, monthlySales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching sales data' });
  }
};

const pharmacistAddSalesInfo = async (req, res) => {
  try {
    const { medicine, quantitySold, totalAmount, saleDate } = req.body;

    // Validate required fields
    if (!medicine || !quantitySold || !totalAmount || !saleDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new sales entry
    const newSale = await Sales.create({
      medicine,
      quantitySold,
      totalAmount,
      saleDate,
    });

    res.status(201).json({ message: 'Sales information added successfully', sale: newSale });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding sales information' });
  }
};


const filterSalesReport = async (req, res) => {
  try {
    const { medicine, startDate, endDate } = req.body;  // Use req.body instead of req.query

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
    res.status(500).json({ error: 'An error occurred while filtering sales report' });
  }
};




const GetWalletCredit = async (req, res) => {
  const username = req.body.username; // Retrieve username from request body
  try {
      console.log("start");
      console.log(username);
      console.log("end");
      const user = await Pharmacist.findOne({username }); // Use the retrieved username
      console.log(user)
      await res.status(200).json(user);
  } catch (err) {
      console.log(err);
  }
};
 


module.exports = { createPharmacistRequest, pharmacistchangepassword, pharmacistViewSales,pharmacistAddSalesInfo ,filterSalesReport,GetWalletCredit};
