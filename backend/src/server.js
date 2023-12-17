// Setting up
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const http = require("http"); // Add this line
const { Server } = require("socket.io");
//const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const router = express.Router();
const {
  addAdmin,
  deletePatient,
  deletePharmacist,
  viewPharmacistRequests,
  viewPatients,
  acceptPharmacistRequest,
  adminchangepassword,
  requestOTP,
  verify,
} = require("./Routes/AdminController"); // Import the new admin controller functions
const { login, logout } = require("./Routes/login");

const path = require("path");

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
const log = require("./Routes/login");
// const user = require("./Routes/userController");

//using routes
app.use("/", pharmacist);
//app.use("/pharma/admin", admin);
app.use("/", patient);
app.use("/", cart);
app.use("/", order);
app.get("/");
// app.use("/user", user);

// MongoDB setup
const MongoURI = process.env.MONGO_URI;
const port = process.env.PORT || "8000";

mongoose.connect(MongoURI).then(() => {
  console.log("MongoDB is now connected!");
  // Starting server
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
    });

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  });

  server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
  });

  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
});

app.post("/addAdmin", addAdmin);
app.post("/login", login);
app.post("/logout", logout);
app.post("/pharmacistRequest/:id", acceptPharmacistRequest);
app.post("/adminchangepassword/:username", adminchangepassword);
app.delete("/deletePharmacist/:id", deletePharmacist);
app.delete("/deletePatient/:id", deletePatient);

app.get("/viewPharmacistRequests", viewPharmacistRequests);
app.get("/viewpatients", viewPatients);
app.post("/payment", async (req, res) => {
  try {
    const { amount, token } = req.body;

    const charge = await stripe.charges.create({
      amount: amount, // Amount in cents
      currency: "usd",
      source: token,
      description: "Test payment",
    });

    res.status(200).send({ success: charge });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
