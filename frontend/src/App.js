import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//import router from "../../backend/src/Routes/PharmacistController";

import Navbar from "./Components/navBar.component";
import AddMed from "./Components/newMed.component";
import EditMed from "./Components/editMed.component";
import AvailableMeds from "./Components/viewMedicine.component";
import SearchBar from "./Components/search-bar.component";
import Filter from "./Components/filter.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <SearchBar />
        <Filter />
        <Routes>
          <Route path="/pharma/pharmacist/addMed" element={<AddMed />} />

          <Route
            path="/pharma/pharmacist/AvailableMedicine"
            element={<AvailableMeds />}
          />

          <Route
            path="/pharma/pharmacist/AvailableMedicine/editMed/:id"
            element={<EditMed />}
          />
          <Route
            path="/pharma/pharmacist/AvailableMedicine/editMed"
            element={<EditMed />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
