import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import PharmacistForm from './components/PharmacistForm';
import AdminForm from './components/AdminForm';
import AdminPharmacistRequests from './components/AdminPharmacistRequests';
import AdminPatientsdelete from './components/AdminPatientsdelete';
import Adminhome from './components/Adminhome';
import PharmacistHome from './components/PharmacistHome';
import PatientHome from './components/PatientHome';
import Login from './components/Login';
import ChangePassword from './components/AdminChangepassword';
import Changepassword from './components/PatientChangePassword';
import PharmacistchangePassword from './components/PharmacistChangePassword';
import PatientAddAddress from './components/PatientAddAddress';
import PatientViewAddress from './components/PatientViewAddress';
import PharmacistViewSales from './components/PharmacistViewSales';
import PharmacistFiltersales from './components/PharmacistFiltersales';
import PaymentForm from './components/PaymentForm';
import Wallet from './components/Wallet';
import WalletViewer from './components/WalletViewer';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import WalletViewerPharmacist from './components/WalletViewerPharmacist';
import PatientChat from './components/PatientChat'; 
import PharmacistChat from './components/PharmacistChat';

const stripePromise = loadStripe("pk_test_51K8pKeAHoHtEwtN5PmpH89COOO1E8kd0TT27PiU2NovDU5RPHP20Q2EXUjzstNx6yhBMwir9egTX1tCwO3D3ebvD00QujcIxos");

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/patient" element={<PatientHome />} />
          <Route path="/pharmacist" element={<PharmacistHome />} />
          <Route path="/admin" element={<Adminhome />} />
          <Route path="/addPatient" element={<PatientForm />} />
          <Route path="/submitPharmacistRequest" element={<PharmacistForm />} />
          <Route path="/AddAdmin" element={<AdminForm />} />
          <Route path="/viewPharmacistRequests" element={<AdminPharmacistRequests />} />
          <Route path="/viewpatients" element={<AdminPatientsdelete />} />
          <Route path="/adminchangepassword" element={<ChangePassword />} />
          <Route path="/changepassword" element={<Changepassword />} />
          <Route path="/pharmacistchangepassword" element={<PharmacistchangePassword />} />
          <Route path="/addAddress" element={<PatientAddAddress />} />
          <Route path="/viewAddress" element={<PatientViewAddress />} />
          <Route key="chat" path="/chat" element={<PatientChat />} />
          <Route path="/pharmacistViewSales" element={<PharmacistViewSales />} />
          <Route path="/filtersales" element={<PharmacistFiltersales />} />
          <Route path="/payment" element={<Elements stripe={stripePromise}><PaymentForm /></Elements>} />
          <Route path="/getWalletCredit" element={<Wallet />} />
          <Route path="/getWalletCredit" element={<WalletViewer />} />
          <Route path="/PharmacistGetWalletCredit" element={<WalletViewerPharmacist />} />
          {/* Add a route for the Zoom link */}
          <Route path="/zoom" element={<PatientChat />} />
          <Route path="/Zoom" element={<PharmacistChat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
