import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:5000/addPatient', patientData);

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
    <div className="PatientForm">
      <h2>Patient Creation Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={patientData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={patientData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={patientData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={patientData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={patientData.dateOfBirth}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={patientData.gender}
            onChange={handleInputChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Mobile Number:
          <input
            type="tel"
            name="mobileNumber"
            value={patientData.mobileNumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Emergency Contact Full Name:
          <input
            type="text"
            name="emergencyContactName"
            value={patientData.emergencyContactName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Emergency Contact Mobile Number:
          <input
            type="tel"
            name="emergencyMobileNumber"
            value={patientData.emergencyMobileNumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Emergency Contact Relation:
          <input
            type="text"
            name="relation"
            value={patientData.relation}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Create Patient</button>
      </form>
    </div>
  );
}

export default PatientForm;
