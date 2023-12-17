const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http"); // Add this line
const { Server } = require("socket.io");
require("dotenv").config();
const { requireAuth } = require("./Middleware/authMiddleware");

const MongoURI = process.env.MONGO_URI;
const {
  createPatient,
  filterPatients,
  changepassword,
  addDeliveryAddress,
  viewAddress,
  chooseMainAddress,
  payWithWallet,
  getWalletCredit,

} = require("./Routes/PatientController");
const {
  createPharmacistRequest,
  pharmacistchangepassword,
  pharmacistViewSales,
  pharmacistAddSalesInfo,
  filterSalesReport,
  GetWalletCredit,
} = require("./Routes/pharmacistController");
const {
  addAdmin,
  deletePatient,
  deletePharmacist,
  viewPharmacistRequests,
  viewPatients,
  acceptPharmacistRequest,
  adminchangepassword,
} = require("./Routes/AdminController");
const { login, logout } = require("./Routes/login");

const path = require("path");

const app = express();
const port = process.env.PORT || "5000";

mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB is now connected!");

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
      console.log(`Listening to requests on http://localhost:5000`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process on connection failure
  });

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());



app.get("/viewpatients", viewPatients);


app.post("/addPatient",createPatient);
app.get("/patients", filterPatients);
app.post("/changepassword/:username", changepassword);
app.post("/addAddress/:username", addDeliveryAddress);
app.get("/viewAddress/:username", viewAddress);
app.put("/choosemainaddress/:username/:id", chooseMainAddress);

app.post("/submitPharmacistRequest", createPharmacistRequest);
app.post("/pharmacistchangepassword/:username", pharmacistchangepassword);
app.get("/pharmacistViewSales",pharmacistViewSales);
app.post("/addsalesinfo",pharmacistAddSalesInfo)
app.post("/filtersales",filterSalesReport);
app.post('/PharmacistGetWalletCredit',GetWalletCredit);

app.post("/addAdmin", addAdmin);
app.post("/", login);
app.post("/logout", logout);
app.post("/pharmacistRequest/:id", acceptPharmacistRequest);
app.post("/adminchangepassword/:username", adminchangepassword);
app.delete("/deletePharmacist/:id", deletePharmacist);
app.delete("/deletePatient/:id", deletePatient);

app.get("/viewPharmacistRequests", viewPharmacistRequests);
app.get("/viewpatients", viewPatients);



app.post('/getWalletCredit', getWalletCredit);
app.post('/payWithWallet',payWithWallet );
app.post('/payment', async (req, res) => {
  try {
      const { amount, token } = req.body;

      const charge = await stripe.charges.create({
          amount: amount, // Amount in cents
          currency: 'usd',
          source: token,
          description: 'Test payment',
      });

      res.status(200).send({ success: charge });
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
})