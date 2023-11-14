import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PatientAddAddress() {
  const username = localStorage.getItem('username'); // Assuming the parameter is 'username'
  console.log('Received request for username:', username);
  const [addressTitle, setAddressTitle] = useState('');
  const [governate, setGovernate] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);





  const handleAddAddress = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/addAddress/${username}`, {
        addressTitle,
        governate,
        city,
        street,
        buildingNumber,
        apartmentNumber,
      });
  
      if (response.status === 201) {
        setSuccess(true);
      } else {
        // Handle unexpected status codes
        console.error('Unexpected status code:', response.status);
        setError('An unexpected error occurred.');
      }
    } catch (error) {
      // Log the entire error object for detailed information
      console.error('Error adding address:', error);
      setError(error.response?.data?.error || 'An error occurred while adding the address.');
    }
  };
  return (
    <div>
      <h3>Add Address</h3>
      <div>
        <label htmlFor="addressTitle">Address Title:</label>
        <input
          type="text"
          id="addressTitle"
          value={addressTitle}
          onChange={(e) => setAddressTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="governate">Governate:</label>
        <input
          type="text"
          id="governate"
          value={governate}
          onChange={(e) => setGovernate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="street">Street:</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="buildingNumber">Building Number:</label>
        <input
          type="text"
          id="buildingNumber"
          value={buildingNumber}
          onChange={(e) => setBuildingNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="apartmentNumber">Apartment Number:</label>
        <input
          type="text"
          id="apartmentNumber"
          value={apartmentNumber}
          onChange={(e) => setApartmentNumber(e.target.value)}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Address added successfully</div>}
      <button onClick={handleAddAddress}>Add Address</button>
    </div>
  );
}

export default PatientAddAddress;
