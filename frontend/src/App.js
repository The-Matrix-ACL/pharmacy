
import { BrowserRouter as  Router, Route , Routes} from "react-router-dom";
import './App.css';
import React from "react" ;
import "bootstrap/dist/css/bootstrap.min.css" ;
//import router from "../../backend/src/Routes/PharmacistController";

import Navbar from "./Components/navBar.component";
import AddMed from "./Components/newMed.component";
import EditMed from "./Components/editMed.component";
import AvailableMeds from "./Components/viewMedicine";
import Cart from "./Components/Cart";
import Login from './Components/Login'; 
import PatientHome from "./Components/PatientHome";
import PatientForm from "./Components/PatientForm";
import PatientList from './Components/PatientList';
import PharmacistForm from './Components/PharmacistForm';
import AdminForm from './Components/AdminForm'; 
import AdminPharmacistRequests from './Components/AdminPharmacistRequests';
import AdminPatientsdelete from './Components/AdminPatientsdelete'; 
import Adminhome from './Components/Adminhome';
import PharmacistHome from './Components/PharmacistHome';
import ChangePassword from './Components/AdminChangepassword';
import Changepassword from './Components/PatientChangePassword';
import PharmacistchangePassword from './Components/PharmacistChangePassword';  
import PatientAddAddress from './Components/PatientAddAddress';
import PatientViewAddress from './Components/PatientViewAddress'
import AddToCart from './Components/AddToCart'
import Medications from "./Components/Medications";


function App() {
  return (
    <Router>
      <div className="container">
      <br/>
      <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/pharma/pharmacist/addMed" element ={<AddMed/>} />
      <Route path="/AvailableMedicine" element ={<Medications/>} />
      <Route path="getCart/:id" element ={<Cart/>} />
      <Route path="addToCart/:userid/:medid" element ={<AddToCart/>} />
      <Route path="/pharma/pharmacist/AvailableMedicine/editMed/:id" element ={<EditMed/>} />
      <Route path="/pharma/pharmacist/AvailableMedicine/editMed" element ={<EditMed/>} />
      <Route path="/patient" element={<PatientHome />} /> {/* Set the AdminHome as the default page for Admin */}
      <Route path="/pharmacist" element={<PharmacistHome />} /> {/* Set the AdminHome as the default page for Admin */}
        <Route path="/admin" element={<Adminhome />} /> {/* Set the AdminHome as the default page for Admin */}
        <Route path="/addPatient"
        element={<PatientForm/>}/>
        <Route path="/submitPharmacistRequest"
        element={<PharmacistForm/>}/>
         <Route path="/AddAdmin"
        element={<AdminForm/>}/>
        <Route path="/viewPharmacistRequests"
        element={<AdminPharmacistRequests/>}/>
         <Route path="/viewpatients"
        element={<AdminPatientsdelete/>}/>
          <Route path="/adminchangepassword"
        element={<ChangePassword/>}/>
        <Route path="/changepassword"
        element={<Changepassword/>}/>
        <Route path="/pharmacistchangepassword"
        element={<PharmacistchangePassword/>}/>
           <Route path="/addAddress"
        element={<PatientAddAddress/>}/>
           <Route path="/viewAddress"
        element={<PatientViewAddress/>}/>
      </Routes>


      </div>
    </Router>
  );
}

export default App;
