const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();

const MongoURI = process.env.MONGO_URI;
const {createPatient, filterPatients} = require('./Routes/PatientController');
const { createPharmacistRequest } = require('./Routes/pharmacistController');
const { addAdmin,deletePatient,deletePharmacist,viewPharmacistRequests} = require('./Routes/AdminController'); // Import the new admin controller functions



const app = express();
const port = process.env.PORT || "3000";

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB is now connected!");
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:3000`);
    });
  })
  .catch(err => console.log(err));

app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

app.use(express.json());
app.post("/addPatient", createPatient);
app.get('/patients', filterPatients);
// TODO: Add the editPatient route here
app.post("/submitPharmacistRequest", createPharmacistRequest);

app.post("/addAdmin", addAdmin);

// Create routes to delete pharmacists and patients
app.delete("/deletePharmacist/:id", deletePharmacist);
app.delete("/deletePatient/:id", deletePatient);

app.get("/viewPharmacistRequests", viewPharmacistRequests);


app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Welcome to the root page.");
});
