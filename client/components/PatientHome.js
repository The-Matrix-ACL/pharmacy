import React from 'react';
import { Link } from 'react-router-dom';

function PatientHome() {
  // Retrieve the username from local storage
  const username = localStorage.getItem('username');
  const handleLogout = () => {
    // Implement the logout logic here, e.g., clearing tokens
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    
    // Redirect to the login page or any other desired page
    window.location.href = '/'; // Update with your login route
  };

  return (
    <div className="PatientHome">
      <div>Welcome, {username}!</div>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <Link to="/changepassword">Change Password</Link>
      </div>
      <div>
        <Link to="/addAddress">Add New Address</Link>
      </div> 
      <div>
        <Link to="/viewAddress">View My Address</Link>
      </div>
    </div>
  );
}

export default PatientHome;
