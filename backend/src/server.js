// Setting up
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(cors());




const path = require('path');

const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//importing pages
//import { pharmaAddMed } from "./pages/pharmaAddMed";

//importing routes
const pharmacist = require("./Routes/PharmacistController");
const admin = require("./Routes/AdminController");
const patient = require("./Routes/PatientController");
const cart = require("./Routes/CartController");
const order = require("./Routes/OrderController");
// const user = require("./Routes/userController");

//using routes
app.use("/pharma/pharmacist", pharmacist);
app.use("/pharma/admin", admin);
app.use("/pharma/patient", patient);
app.use("/pharma/patient/cart", cart);
app.use("/pharma/patient/order", order);
app.get("/");
// app.use("/user", user);

// MongoDB setup
const MongoURI = process.env.MONGO_URI;
const port = process.env.PORT || "8000";

mongoose.connect(MongoURI).then(() => {
  console.log("MongoDB is now connected!");
  // Starting server
  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
});

app.use(express.json());
const router = express.Router();
app.post("/addPatient", createPatient);
app.use(router);



app.get('/patients', filterPatients);
app.post("/changepassword/:username",changepassword);
app.post("/addAddress/:username",addDeliveryAddress);
app.get("/viewAddress/:username",viewAddress);
app.put("/choosemainaddress/:username",chooseMainAddress);

app.post("/submitPharmacistRequest", createPharmacistRequest);
app.post("/pharmacistchangepassword/:username",pharmacistchangepassword);

app.post("/addAdmin", addAdmin);
app.post("/login",login);
app.post("/logout",logout);
app.post("/pharmacistRequest/:id",acceptPharmacistRequest);
app.post("/adminchangepassword/:username",adminchangepassword);
app.delete("/deletePharmacist/:id", deletePharmacist);
app.delete("/deletePatient/:id", deletePatient);

app.get("/viewPharmacistRequests", viewPharmacistRequests);
app.get("/viewpatients",viewPatients);
