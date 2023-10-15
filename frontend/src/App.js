<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
=======

import { BrowserRouter as  Router, Route , Routes} from "react-router-dom";
import React from "react" ;
import "bootstrap/dist/css/bootstrap.min.css" ;
>>>>>>> 1dcd1821573b0c683c64c4b7dd01e515198ecd1e
//import router from "../../backend/src/Routes/PharmacistController";

import Navbar from "./Components/navBar.component";
import AddMed from "./Components/newMed.component";
<<<<<<< HEAD
import Filter from "./Components/filter.component";
import SearchBar from "./Components/search-bar.component";
//import Filter from "./Components/filter.component";
=======
import EditMed from "./Components/editMed.component";
import AvailableMeds from "./Components/viewMedicine.component";

>>>>>>> 1dcd1821573b0c683c64c4b7dd01e515198ecd1e

function App() {
  return (
    <Router>
      <div className="container">
<<<<<<< HEAD
        <Navbar />
        <SearchBar />

        <Filter />
        <br />
        <Routes>
          <Route path="/pharma/pharmacist/addMed" element={<AddMed />} />
        </Routes>
=======
      <Navbar />
      <br/>
      <Routes>
      <Route path="/pharma/pharmacist/addMed" element ={<AddMed/>} />
    
      <Route path="/pharma/pharmacist/AvailableMedicine" element ={<AvailableMeds/>} />

      <Route path="/pharma/pharmacist/AvailableMedicine/editMed/:id" element ={<EditMed/>} />
      <Route path="/pharma/pharmacist/AvailableMedicine/editMed" element ={<EditMed/>} />
      </Routes>


>>>>>>> 1dcd1821573b0c683c64c4b7dd01e515198ecd1e
      </div>
    </Router>
  );
}

export default App;
