import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientViewAddress() {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const [mainAddressIndex, setMainAddressIndex] = useState(null);

  useEffect(() => {
    // Fetch addresses when the component mounts
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      // Retrieve patient information from localStorage or context
      const patientUsername = localStorage.getItem('username');

      // Fetch addresses from the server
      const response = await axios.get(`http://localhost:5000/viewaddress/${patientUsername}`);

      // Set the addresses from the response data
      setAddresses(response.data.addresses);

      // Set the initial main address index (for example, the first address)
      setMainAddressIndex(0);
    } catch (error) {
      setError('Error fetching addresses');
    }
  };

  const setAsMainAddress = async (index) => {
    try {
      // Update the main address index in the local state
      setMainAddressIndex(index);

      // Update the main address on the server
      const patientUsername = localStorage.getItem('username');
      await axios.post(`http://localhost:5000/choosemainaddress/${patientUsername}`, {
        addressIndex: index,
      });

      console.log('Main address updated successfully');
    } catch (error) {
      console.error('Error updating main address:', error);
      setError('Error updating main address');
    }
  };

  return (
    <div>
      <h3>Your Addresses</h3>
      {addresses.length === 0 && <p>No addresses found.</p>}
      <ul>
        {addresses.map((address, index) => (
          <li key={index} style={{ backgroundColor: index === mainAddressIndex ? 'yellow' : 'white' }}>
            <p>Address Title: {address.addressTitle}</p>
            <p>Governate: {address.governate}</p>
            <p>City: {address.city}</p>
            <p>Street: {address.street}</p>
            <p>Building Number: {address.buildingNumber}</p>
            <p>Apartment Number: {address.apartmentNumber}</p>
            <button onClick={() => setAsMainAddress(index)}>Set as Main Address</button>
          </li>
        ))}
      </ul>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default PatientViewAddress;
