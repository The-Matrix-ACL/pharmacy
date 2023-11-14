import React from 'react';
import { Link } from 'react-router-dom';



function PatientHome() {

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
        <Link to="/changepassword">ChangePassword</Link>
        <div>
        <Link to="/getCart/:id">Cart</Link>
        </div>
        <div>
        <Link to="/AvailableMedicine">medicine</Link>
        </div>
        <div>
        <Link to="/addAddress">Add New Address</Link>
      </div> 
      <div>
        <Link to="/viewAddress">View My Address</Link>
      </div>
        
      </div>
      </div>

    
  );
}


export default PatientHome;