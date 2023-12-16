import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPharmacistRequests() {
  const [pharmacistRequests, setPharmacistRequests] = useState([]);

  useEffect(() => {
    // Fetch pharmacist requests when the component mounts
    async function fetchPharmacistRequests() {
      try {
        const response = await axios.get('http://localhost:8000/viewPharmacistRequests');
        if (response.status === 200) {
          setPharmacistRequests(response.data);
        } else {
          console.error("Failed to fetch pharmacist requests.");
        }
      } catch (error) {
        console.error("Error fetching pharmacist requests:", error);
      }
    }

    fetchPharmacistRequests();
  }, []);

  const handleDeleteRequest = async (pharmacistId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/deletePharmacist/${pharmacistId}`);
      if (response.status === 204) {
        // Remove the deleted pharmacist request from the list
        setPharmacistRequests((requests) => requests.filter((request) => request._id !== pharmacistId));
      } else {
        console.error("Failed to delete pharmacist request.");
      }
    } catch (error) {
      console.error("Error deleting pharmacist request:", error);
    }
  };

  const handleAcceptRequest = async (pharmacistId) => {
    try {
      const response = await axios.post(`http://localhost:8000/pharmacistRequest/${pharmacistId}`, {
        decision: 'approved',
      });
      if (response.status === 200) {
        // Update the status in the UI
        setPharmacistRequests((requests) =>
          requests.map((request) =>
            request._id === pharmacistId ? { ...request, status: 'approved' } : request
          )
        );
      } else {
        console.error("Failed to accept pharmacist request:", response);
      }
    } catch (error) {
      console.error("Error accepting pharmacist request:", error);
    }
  };
  

  return (
    <div className="AdminPharmacistRequests">
      <h2>Pharmacist Registration Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Hourly Rate</th>
            <th>Affiliation</th>
            <th>Education</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pharmacistRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.username}</td>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.hourlyRate}</td>
              <td>{request.affiliation}</td>
              <td>{request.educationalBackground}</td>
              <td>{request.status}</td>
              <td>
                <button onClick={() => handleAcceptRequest(request._id)} disabled={request.status !== 'pending'}>
                  Accept
                </button>
                <button onClick={() => handleDeleteRequest(request._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPharmacistRequests;
