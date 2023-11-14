
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/', {
        username,
        password,
        userType,
      });

      if (response.status === 200) {
        const { token, userType, username, userId } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId);

        // Use the navigate function to redirect
        if (userType === 'admin') {
          navigate('/admin');
        } else if (userType === 'pharmacist') {
          navigate('/pharmacist');
        } else if (userType === 'patient') {
          navigate('/patient');
        }
      } else {
        alert('Invalid username or password.');
        console.error('Authentication failed');
      }
    } catch (error) {
      alert('Invalid username or password. Or as a pharmacist, your request is still pending.');
      console.error('Error during authentication:', error);
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>User Type:</label>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="pharmacist">Pharmacist</option>
          <option value="patient">Patient</option>
        </select>
      </div>
      <button onClick={handleLogin}>Login</button>
      <div>
        <Link to="/addPatient">Register as a patient</Link>
      </div>
      <div>
        <Link to="/submitPharmacistRequest">Register as a pharmacist</Link>
      </div>
    </div>
  );
}

export default Login;
