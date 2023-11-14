// src/components/Patient/PatientList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get('/patients') // Adjust the route as needed
      .then((response) => setPatients(response.data))
      .catch((error) => console.error('Error fetching patients:', error));
  }, []);

  return (
    <div>
      <h1>List of Patients</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient._id}>{patient.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PatientList;
