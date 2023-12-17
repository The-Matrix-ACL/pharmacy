const Patient = require('../Models/Patient');

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




const getWalletCredit = async (req, res) => {
  const username = req.body.username; // Retrieve username from request body
  try {
      console.log("start");
      console.log(username);
      console.log("end");
      const user = await Patient.findOne({username }); // Use the retrieved username
      console.log(user)
      await res.status(200).json(user);
  } catch (err) {
      console.log(err);
  }
};
const payWithWallet = async (req, res) => {
  try {
    const { amount} = req.body; 
    const username = req.body.username;
    const user = await Patient.findOne({username});

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      if (user.WalletCredit < amount) {
          return res.status(400).json({ message: "Insufficient wallet credit" });
      }
      user.WalletCredit -= amount;
      const updatedUser = await user.save();
      res.status(200).json({success: true,newWalletCredit: updatedUser.WalletCredit});
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while processing your request" });
  }
}

const PharmacistRequest = require('../Models/Pharmacist'); // Import the Pharmacist model
const notificationModel=require('../Models/Notification');

const createnotification = async (req,res) =>
{
  const {userid,id,subject,content} = req.body;
  const user = await Patient.findOne({_id:userid});
  const doctor = await PharmacistRequest.findOne({_id:id});
  const username = user.Username;
  console.log(username);
  const doctorname = doctor.Username;
  console.log(doctorname);
  var status = "Active";
  if(subject==="Appointment Cancelled"){
    await notificationModel.deleteMany({userid:userid,doctorid:id,isuser:true});
    await notificationModel.deleteMany({userid:userid,doctorid:id,isdoctor:true});
    await userModel.findOneAndUpdate({_id:userid},{WalletCredit:user.WalletCredit+doctor.SessionPrice})
    const deleted = await notificationModel.findOne({userid:userid,doctorid:id,isdoctor:true});
    console.log(deleted+'e');
    status = "Cancelled"
  }
  else if(subject === "Followup Request"){
    status = "Pending"
  }
  const notification = await notificationModel.create({userid:userid , doctorid:id , sender:doctorname,subject:subject,content:content +doctorname,isuser:true,Status:status});
  const notification2 = await notificationModel.create({userid:userid , doctorid:id , sender:username,subject:subject,content:content +username,isdoctor:true,Status:status});
  console.log(notification);
  console.log(notification2);
  const mailOptions = {
    from: "el7a2niYaMeleegy@hotmail.com",
    to: "mazendarwish69@gmail.com",
    subject:subject,
    html: `<p>${content}</p><p style="color:tomato; font-size:25px; letter-spacing:2px;">${username +" & "+doctorname}</p>`,
  };
  await sendEmail(mailOptions);
  res.status(200).json([notification,notification2]);
}



module.exports = { createPatient, filterPatients,changepassword,addDeliveryAddress,viewAddress,chooseMainAddress,payWithWallet,getWalletCredit,createnotification};
