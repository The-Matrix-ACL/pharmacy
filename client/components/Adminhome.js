import React from 'react';
import { Link } from 'react-router-dom';


function Adminhome() {
  const username = localStorage.getItem('username');
  const handleLogout = () => {
    // Implement the logout logic here, e.g., clearing tokens
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    
    // Redirect to the login page or any other desired page
    window.location.href = '/login'; // Update with your login route
  };

  return (
    <div className="Adminhome">
      <h2>Welcome, Admin</h2>
      <div>
        <Link to="/addAdmin">Add Administrator</Link>
      </div>
      <div>
        <Link to="/viewPharmacistRequests">View Pharmacist Requests</Link>
      </div>
      <div>
        <Link to="/viewpatients">View Patients</Link>
      </div>
      <div>
        <Link to="/adminchangepassword">ChangePassword</Link>
      </div>
      <div>
        <Link to="/pharmacistViewSales">View sales</Link>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Adminhome;
