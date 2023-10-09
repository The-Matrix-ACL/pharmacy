const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./user");

// MongoDB setup
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db");
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port: ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());

app.use("/api/patients", userRouter);

const pharmacistRouter = require("./pharmacist"); // Import the pharmacist routes

app.use("/api/pharmacists", pharmacistRouter); // Use the pharmacist routes

const adminRouter = require("./admin"); // Import the admin routes

app.use("/api/admins", adminRouter); // Use the admin routes
