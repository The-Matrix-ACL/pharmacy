// Setting up
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());

//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//importing pages
//import { pharmaAddMed } from "./pages/pharmaAddMed";

//importing routes
const pharmacist = require("./Routes/PharmacistController");
const admin = require("./Routes/AdminController");
const patient = require("./Routes/PatientController");
// const user = require("./Routes/userController");

//using routes
app.use("/pharma/pharmacist", pharmacist);
app.use("/pharma/admin", admin);
app.use("/pharma/patient", patient);
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
