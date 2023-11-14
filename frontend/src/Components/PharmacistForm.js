import React, { useState } from 'react';
import axios from 'axios';

function PharmacistForm() {
  const [pharmacistData, setPharmacistData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    hourlyRate: '',
    affiliation: '',
    educationalBackground: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPharmacistData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace the URL with the correct endpoint on your server for pharmacist registration request
      const response = await axios.post('http://localhost:8000/submitPharmacistRequest', pharmacistData);

      if (response.status === 201) {
        alert("Pharmacist registration request submitted successfully");
        // Optionally, you can reset the form fields here
        setPharmacistData({
          username: '',
          name: '',
          email: '',
          password: '',
          dateOfBirth: '',
          hourlyRate: '',
          affiliation: '',
          educationalBackground: '',
        });
      } else {
        console.error("Failed to submit pharmacist registration request.");
      }
    } catch (error) {
      console.error("Error submitting pharmacist registration request:", error);
    }
  };

  return (
    <div className="PharmacistForm">
      <h2>Pharmacist Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={pharmacistData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={pharmacistData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={pharmacistData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={pharmacistData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={pharmacistData.dateOfBirth}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Hourly Rate:
          <input
            type="number"
            name="hourlyRate"
            value={pharmacistData.hourlyRate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Affiliation:
          <input
            type="text"
            name="affiliation"
            value={pharmacistData.affiliation}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Educational Background:
          <input
            type="text"
            name="educationalBackground"
            value={pharmacistData.educationalBackground}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit Registration Request</button>
      </form>
    </div>
  );
}

export default PharmacistForm;
