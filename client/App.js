import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
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








function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} /> {/* Set the AdminHome as the default page for Admin */}
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
      </BrowserRouter>
    </div>
  );
}

export default App;
