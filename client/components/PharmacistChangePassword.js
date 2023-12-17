import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PharmacistchangePassword() {
  const username = localStorage.getItem('username');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // You can use the 'username' value here if needed
    console.log(username);
  }, [username]);

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/pharmacistchangepassword/${username}`, {
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h3>Change Password</h3>
      <div>
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Password changed successfully</div>}
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
}


export default PharmacistchangePassword;