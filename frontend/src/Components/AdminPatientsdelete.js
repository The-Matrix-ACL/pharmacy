import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPatientsdelete() {
  const [patientinfo, setPatientInfo] = useState([]);

  useEffect(() => {
    // Fetch pharmacist requests when the component mounts
    async function fetchPatient() {
      try {
        const response = await axios.get('http://localhost:5000/viewpatients');
        if (response.status === 200) {
          setPatientInfo(response.data);
        } else {
          console.error("Failed to fetch pharmacist requests.");
        }
      } catch (error) {
        console.error("Error fetching pharmacist requests:", error);
      }
    }

    fetchPatient();
  }, []);

  const handleDeleteRequest = async (patientId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deletePatient/${patientId}`);
      if (response.status === 204) {
        // Remove the deleted pharmacist request from the list
        setPatientInfo((requests) => requests.filter((request) => request._id !== patientId));
      } else {
        console.error("Failed to delete pharmacist request.");
      }
    } catch (error) {
      console.error("Error deleting pharmacist request:", error);
    }
  };

  return (
    <div className="AdminPatientsdelete">
      <h2>Patients</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {patientinfo.map((request) => (
            <tr key={request._id}>
              <td>{request.username}</td>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>
                <button onClick={() => handleDeleteRequest(request._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPatientsdelete;
