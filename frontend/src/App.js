import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//import router from "../../backend/src/Routes/PharmacistController";

//import AddMed from "./Components/newMed.component";
//import EditMed from "./Components/editMed.component";
//import AvailableMeds from "./Components/viewMedicine.component";
import ResetPasswordPatient from "./pages/resetPasswordPatient";
import ResetPasswordAdmin from "./pages/resetPasswordAdmin";
import ResetPasswordPharmacist from "./pages/resetPasswordPharmacist";
import Navbar from "./Components/navBar.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route
            path="/pharma/patient/resetPassword"
            element={<ResetPasswordPatient />}
          />
          <Route
            path="/pharma/admin/resetPassword"
            element={<ResetPasswordAdmin />}
          />{" "}
          <Route
            path="/pharma/pharmacist/resetPassword"
            element={<ResetPasswordPharmacist />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
