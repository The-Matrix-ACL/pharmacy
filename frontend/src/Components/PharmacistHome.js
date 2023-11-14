import React from 'react';
import { Link } from 'react-router-dom';



function PharmacistHome() {
  const username = localStorage.getItem('username');
const handleLogout = () => {
    // Implement the logout logic here, e.g., clearing tokens
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    
    // Redirect to the login page or any other desired page
    window.location.href = '/login'; // Update with your login route
  };

  return (
    <div className="PatientHome">
 
        <button onClick={handleLogout}>Logout</button>
        <div>
        <Link to="/pharmacistchangepassword">ChangePassword</Link>
      </div>
      </div>
    
  );
}


export default PharmacistHome;
