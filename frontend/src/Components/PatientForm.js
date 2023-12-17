import React, { useState } from 'react';
import axios from 'axios';
import acllogo from "/Users/shaymaa/Desktop/ACL/pharmacy/frontend/src/Components/acllogo.png";
//import "./Patientform.css";

function PatientForm() {
  const [patientData, setPatientData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    emergencyContactName: '',
    emergencyMobileNumber: '',
    relation: '',
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace the URL with the correct endpoint on your server for patient creation
      const response = await axios.post('http://localhost:8000/addPatient', patientData);

      if (response.status === 200) {
        alert("Patient created successfully");
        setPatientData({
          username: '',
          name: '',
          email: '',
          password: '',
          dateOfBirth: '',
          gender: '',
          mobileNumber: '',
          emergencyContactName: '',
          emergencyMobileNumber: '',
          relation: '',
          
        });
      } else {
        alert("Paatient created successfully.")
        console.error("Failed to create the patient.");
      }
    } catch (error) {
      console.error("Error creating the patient:", error);
    }
  };

  return (
    <div className="PharmaSignupPage" style={{width: 1440, height: 1793, position: 'relative', background: 'white'}}>
    <div className="Botbar" style={{width: 1493, height: 131, left: -53, top: 1704, position: 'absolute'}}>
      <div className="Rectangle1" style={{width: 1440, height: 70, left: 53, top: 19, position: 'absolute', background: '#4685FF'}} />
      <img className="Acllogo1" style={{width: 271, height: 131, left: 0, top: 0, position: 'absolute'}} src={acllogo} />
      <div className="El7a2niClinicsAndPharmacy2023" style={{left: 563, top: 47, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 25, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>© el7a2ni clinics and pharmacy 2023</div>
    </div>
    <div className="Navbar" style={{width: 1683, height: 446, left: -243, top: -89, position: 'absolute'}}>
      <div className="Rectangle1" style={{width: 1440, height: 175, left: 243, top: 89, position: 'absolute', background: '#4685FF'}} />
      <div className="Logo" style={{width: 963, height: 446, left: 0, top: 0, position: 'absolute'}}>
        <img className="Acllogo1" style={{width: 923, height: 446, left: 0, top: 0, position: 'absolute'}} src={acllogo} />
        <div className="Pharmacy" style={{width: 317, height: 59, left: 646, top: 178, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 60, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>pharmacy</div>
        <div className="Logobtn" style={{width: 719, height: 175, left: 243, top: 89, position: 'absolute'}} />
      </div>

      <a href="/login" className="Signup" style={{width: 163, height: 59, left: 1451, top: 177, position: 'absolute'}}>
        <div className="Rectangle4" style={{width: 160.55, height: 59, left: 2.45, top: 0, position: 'absolute', background: 'white', borderRadius: 18}} />
        <div className="SignUp" style={{width: 163, height: 59, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: '#4685FF', fontSize: 32, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Login</div>
      </a>
    
   
    </div>
    <div className="Login" style={{width: 502.02, height: 1380, left: 451.98, top: 288, position: 'absolute'}}>
    <div className="Relation" style={{width: 473, height: 83, left: 13.02, top: 1174, position: 'absolute'}}>
      <div className="Rectangle5" style={{width: 473, height: 83, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
      <input
      type="text"
      name="relation"
      value={patientData.relation}
      onChange={handleInputChange}
      style={{
        width: 453,
        height: 63,
        position: 'absolute',
        top: 10,
        left: 10,
        border: "1px solid #ccc",
        borderRadius: 5,
        padding: "5px",
        fontSize: 16,
        zIndex: 1,
      }}
    />    </div>
    <div className="Mobileno" style={{width: 473, height: 83, left: 16.02, top: 1045, position: 'absolute'}}>
      <div className="Rectangle5" style={{width: 473, height: 83, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
      <input
            type="tel"
            name="emergencyMobileNumber"
            value={patientData.emergencyMobileNumber}
            onChange={handleInputChange}
            style={{
              width: 453,
              height: 63,
              position: 'absolute',
              top: 10,
              left: 10,
              border: "1px solid #ccc",
              borderRadius: 5,
              padding: "5px",
              fontSize: 16,
              zIndex: 1,}}
          />         </div>
    <div className="Name" style={{width: 473, height: 83, left: 16.02, top: 917, position: 'absolute'}}>
      <div className="Rectangle5" style={{width: 473, height: 83, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
      <input
            type="text"
            name="emergencyContactName"
            value={patientData.emergencyContactName}
            onChange={handleInputChange}
            style={{
              width: 453,
              height: 63,
              position: 'absolute',
              top: 10,
              left: 10,
              border: "1px solid #ccc",
              borderRadius: 5,
              padding: "5px",
              fontSize: 16,
              zIndex: 1,}}
          />    </div>
      <div className="EmergencyContactFormBounds" style={{width: 471.09, height: 408, left: 13.02, top: 825, position: 'absolute'}}>
        <div className="Line1" style={{width: 471.09, height: 0, left: 0, top: 54.80, position: 'absolute', border: '5px #4685FF solid'}}></div>
        <div className="EmergencyContact" style={{width: 352, height: 55, left: 119, top: 0, position: 'absolute', textAlign: 'right', color: '#4685FF', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Emergency Contact</div>
      </div>
      <div className="Formbounds" style={{width: 502.02, height: 1380, left: 0, top: 0, position: 'absolute'}}>
        <div className="Login" style={{width: 468, height: 59, left: 16.02, top: 1321, position: 'absolute'}}>
        <button className="SignUp" style={{
            width: 468,
            left: 0,
            top: 12,
            position: 'absolute',
            textAlign: 'center',
            background: '#4685FF',
            color: 'white',
            fontSize: 32,
            fontFamily: 'Josefin Sans',
            fontWeight: '400',
            wordWrap: 'break-word',
            cursor: 'pointer', /* Change cursor to pointer on hover */
            padding: 10, /* Add padding for better visual separation */
          }} onClick={handleSubmit}>Sign Up</button>
                  
      </div>
        <div className="Line1" style={{width: 500, height: 0, left: 0, top: 36, position: 'absolute', border: '5px #4685FF solid'}}></div>
        <div className="SignUp" style={{width: 133, height: 36, left: 367.02, top: 0, position: 'absolute', textAlign: 'right', color: '#4685FF', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Sign Up</div>
      </div>
      <div className="Mobileno" style={{width: 473, height: 83, left: 13.02, top: 716, position: 'absolute'}}>
        <div className="Rectangle5" style={{width: 473, height: 83, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input
            type="tel"
            name="mobileNumber"
            value={patientData.mobileNumber}
            onChange={handleInputChange}
            style={{
              width: 453,
              height: 63,
              position: 'absolute',
              top: 10,
              left: 10,
              border: "1px solid #ccc",
              borderRadius: 5,
              padding: "5px",
              fontSize: 16,
              zIndex: 1,}}
          />      </div>
     
      <div className="Dob" style={{width: 172, height: 83, left: 16.02, top: 602, position: 'absolute'}}>
        <div className="Rectangle5" style={{width: 172, height: 83, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input
            type="date"
            name="dateOfBirth"
            value={patientData.dateOfBirth}
            onChange={handleInputChange}
            style={{
              width: 172,
              height: 83,
              border: '7px solid #4685FF',
              borderRadius: 20,
              background: 'white',
              color: 'rgba(69.91, 132.84, 255, 0.50)',
              fontSize: 20,
              fontFamily: 'Josefin Sans',
              fontWeight: 400,
              padding: 10,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />      </div>
      <div className="Gender" style={{width: 172, height: 83, left: 268.02, top: 602, position: 'absolute'}}>
    <div className="Rectangle5" style={{width: 172, height: 83, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
    <select
            name="gender"
            value={patientData.gender}
            onChange={handleInputChange}
            style={{
              width: 172,
              height: 83,
              border: '7px solid #4685FF',
              borderRadius: 20,
              background: 'white',
              color: 'rgba(69.91, 132.84, 255, 0.50)',
              fontSize: 20,
              fontFamily: 'Josefin Sans',
              fontWeight: 400,
              padding: 10,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>

          </select>
  </div>
      <div className="Password" style={{width: 473, height: 83, left: 15.02, top: 485, position: 'absolute'}}>
        <div className="Rectangle5" style={{width: 473, height: 83, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input
            type="password"
            name="password"
            value={patientData.password}
            onChange={handleInputChange}
            style={{
              width: 453,
              height: 63,
              position: 'absolute',
              top: 10,
              left: 10,
              border: "1px solid #ccc",
              borderRadius: 5,
              padding: "5px",
              fontSize: 16,
              zIndex: 1,}}
          />      </div>
      <div className="Email" style={{width: 473, height: 83, left: 13.02, top: 355, position: 'absolute'}}>
        <div className="Rectangle5" style={{width: 473, height: 83, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input
            type="email"
            name="email"
            value={patientData.email}
            onChange={handleInputChange}
            style={{
              width: 453,
              height: 63,
              position: 'absolute',
              top: 10,
              left: 10,
              border: "1px solid #ccc",
              borderRadius: 5,
              padding: "5px",
              fontSize: 16,
              zIndex: 1,}}
          />      </div>
      <div className="Name" style={{width: 473, height: 83, left: 13.02, top: 225, position: 'absolute'}}>
        <div className="Rectangle5" style={{width: 473, height: 83, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input
            type="text"
            name="name"
            value={patientData.name}
            onChange={handleInputChange}
            style={{
              width: 453,
              height: 63,
              position: 'absolute',
              top: 10,
              left: 10,
              border: "1px solid #ccc",
              borderRadius: 5,
              padding: "5px",
              fontSize: 16,
              zIndex: 1,}}
          />      </div>
      <div className="Username" style={{width: 473, height: 83, left: 13.02, top: 95, position: 'absolute'}}>
        <div className="Rectangle5" style={{width: 473, height: 83, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input
            type="text"
            name="username"
            value={patientData.username}
            onChange={handleInputChange}
            style={{
              width: 453,
              height: 63,
              position: 'absolute',
              top: 10,
              left: 10,
              border: "1px solid #ccc",
              borderRadius: 5,
              padding: "5px",
              fontSize: 16,
              zIndex: 1,}}
          />      </div>
    </div>

    <div className="Username" style={{width: 250, height: 31, left: 470, top: 342, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Username</div>
  <div className="Name" style={{width: 203, height: 31, left: 477, top: 471, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Name</div>
  <div className="Email" style={{width: 148, height: 28, left: 479, top: 607, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Email</div>
  <div className="Password" style={{width: 156, height: 33, left: 484, top: 733, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Password</div>
  <div className="DateOfBirth" style={{width: 147, height: 19, left: 482, top: 864, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 20, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Date Of Birth</div>
  <div className="Gender" style={{width: 127, height: 22, left: 720, top: 861, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 20, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>gender</div>
  <div className="MobileNumber" style={{width: 297, height: 28, left: 480, top: 973, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Mobile Number</div>
  <div className="Name" style={{width: 200, height: 33, left: 486, top: 1172, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Name</div>
  <div className="MobileNumber" style={{width: 290, height: 33, left: 486, top: 1295, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Mobile Number</div>
  <div className="RelationToPatient" style={{width: 346, height: 36, left: 486, top: 1423, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Relation To Patient</div>
  </div>
  );
}

export default PatientForm;
