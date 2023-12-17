import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import router from "../../backend/src/Routes/PharmacistController";

import Navbar from "./Components/navBar.component";
import AddMed from "./Components/newMed.component";
import EditMed from "./Components/editMed.component";
import AvailableMeds from "./Components/viewMedicine";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import PatientHome from "./Components/PatientHome";
import PatientForm from "./Components/PatientForm";
import PatientList from "./Components/PatientList";
import PharmacistForm from "./Components/PharmacistForm";
import AdminForm from "./Components/AdminForm";
import AdminPharmacistRequests from "./Components/AdminPharmacistRequests";
import AdminPatientsdelete from "./Components/AdminPatientsdelete";
import Adminhome from "./Components/Adminhome";
import PharmacistHome from "./Components/PharmacistHome";
import ChangePassword from "./Components/AdminChangepassword";
import Changepassword from "./Components/PatientChangePassword";
import PharmacistchangePassword from "./Components/PharmacistChangePassword";
import PatientAddAddress from "./Components/PatientAddAddress";
import PatientViewAddress from "./Components/PatientViewAddress";

import Medications from "./Components/Medications";
import ResetPasswordPatient from "./pages/resetPasswordPatient";
import ResetPasswordAdmin from "./pages/resetPasswordAdmin";
import ResetPasswordPharmacist from "./pages/resetPasswordPharmacist";
import Order from "./Components/order-view.components";
import Home from "./Components/Home";
import MedicationsPharmacist from "./Components/MedsPharmacist";
import PatientChat from "./Components/PatientChat";
import PharmacistViewSales from "./Components/PharmacistViewSales";
import PharmacistFiltersales from "./Components/PharmacistFiltersales";
import PaymentForm from "./Components/PaymentForm";
import Wallet from "./Components/Wallet";
import WalletViewer from "./Components/WalletViewer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import WalletViewerPharmacist from "./Components/WalletViewerPharmacist";
import PharmacistChat from "./Components/PharmacistChat";

const stripePromise = loadStripe(
  "pk_test_51K8pKeAHoHtEwtN5PmpH89COOO1E8kd0TT27PiU2NovDU5RPHP20Q2EXUjzstNx6yhBMwir9egTX1tCwO3D3ebvD00QujcIxos"
);

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />

        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addMed" element={<AddMed />} />
          <Route path="/AvailableMedicine" element={<Medications />} />
          <Route
            path="/AvailableMedicinePharmacist"
            element={<MedicationsPharmacist />}
          />
          <Route path="getCart/:id" element={<Cart />} />
          <Route
            path="/AvailableMedicinePharmacist/editMed/:id"
            element={<EditMed />}
          />
          <Route path="/AvailableMedicine/editMed" element={<EditMed />} />
          <Route path="/patient" element={<PatientHome />} />{" "}
          {/* Set the AdminHome as the default page for Admin */}
          <Route path="/pharmacist" element={<PharmacistHome />} />{" "}
          {/* Set the AdminHome as the default page for Admin */}
          <Route path="/admin" element={<Adminhome />} />{" "}
          {/* Set the AdminHome as the default page for Admin */}
          <Route path="/addPatient" element={<PatientForm />} />
          <Route path="/submitPharmacistRequest" element={<PharmacistForm />} />
          <Route path="/AddAdmin" element={<AdminForm />} />
          <Route
            path="/viewPharmacistRequests"
            element={<AdminPharmacistRequests />}
          />
          <Route path="/viewpatients" element={<AdminPatientsdelete />} />
          <Route path="/adminchangepassword" element={<ChangePassword />} />
          <Route path="/changepassword" element={<Changepassword />} />
          <Route
            path="/pharmacistchangepassword"
            element={<PharmacistchangePassword />}
          />
          <Route path="/addAddress" element={<PatientAddAddress />} />
          <Route path="/viewAddress" element={<PatientViewAddress />} />
          <Route path="/resetPassword" element={<ResetPasswordPatient />} />
          <Route path="/resetPassword" element={<ResetPasswordAdmin />} />{" "}
          <Route path="/resetPassword" element={<ResetPasswordPharmacist />} />
          <Route path="/viewOrder/:userid" element={<Order />} />
          <Route path="/cancelOrder/:userid" element={<Order />} />
          <Route key="chat" path="/chat" element={<PatientChat />} />
          <Route
            path="/pharmacistViewSales"
            element={<PharmacistViewSales />}
          />
          <Route path="/filtersales" element={<PharmacistFiltersales />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            }
          />
          <Route path="/getWalletCredit" element={<Wallet />} />
          <Route path="/getWalletCredit" element={<WalletViewer />} />
          <Route
            path="/PharmacistGetWalletCredit"
            element={<WalletViewerPharmacist />}
          />
          <Route path="/zoomPatient" element={<PatientChat />} />
          <Route path="/ZoomPharmacist" element={<PharmacistChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
