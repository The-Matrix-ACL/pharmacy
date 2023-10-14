import { BrowserRouter as  Router, Route , Routes} from "react-router-dom";
import React from "react" ;
import "bootstrap/dist/css/bootstrap.min.css" ;
//import router from "../../backend/src/Routes/PharmacistController";

import Navbar from "./Components/navBar.component";
import AddMed from "./Components/newMed.component";


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Routes>
      <Route path="/pharma/pharmacist/addMed" element ={<AddMed/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
