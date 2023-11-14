const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const { requireAuth } = require('./MIddleware/authMiddleware');


const MongoURI = process.env.MONGO_URI;
const {createPatient, filterPatients,changepassword,addDeliveryAddress, viewAddress, chooseMainAddress} = require('./Routes/PatientController');
const { createPharmacistRequest,pharmacistchangepassword } = require('./Routes/pharmacistController');
const { addAdmin,deletePatient,deletePharmacist,viewPharmacistRequests,viewPatients,acceptPharmacistRequest,adminchangepassword} = require('./Routes/AdminController'); // Import the new admin controller functions
const{login,logout }=require('./Routes/login');


const path = require('path');


const app = express();
app.use(cors());
const port = process.env.PORT || "5000";

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB is now connected!");
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:5000`);
    });
  })
  .catch(err => console.log(err));



const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));





app.use(express.json());
const router = express.Router();
router.post("/addPatient", createPatient);
app.use(router);



app.get('/patients', filterPatients);
app.post("/changepassword/:username",changepassword);
app.post("/addAddress/:username",addDeliveryAddress);
app.get("/viewAddress/:username",viewAddress);
app.put("/choosemainaddress/:username/:id",chooseMainAddress);

app.post("/submitPharmacistRequest", createPharmacistRequest);
app.post("/pharmacistchangepassword/:username",pharmacistchangepassword);

app.post("/addAdmin", addAdmin);
app.post("/",login);
app.post("/logout",logout);
app.post("/pharmacistRequest/:id",acceptPharmacistRequest);
app.post("/adminchangepassword/:username",adminchangepassword);
app.delete("/deletePharmacist/:id", deletePharmacist);
app.delete("/deletePatient/:id", deletePatient);

app.get("/viewPharmacistRequests", viewPharmacistRequests);
app.get("/viewpatients",viewPatients);



