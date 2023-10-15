import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Pharmacy
        </Link>
        <div className="collpase navbar-collapse">
<<<<<<< HEAD
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link
                to="/pharma/pharmacist/AvailableMedicine"
                className="nav-link"
              >
                Available medicine
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/pharma/pharmacist/addMed" className="nav-link">
                Add new medicine
              </Link>
            </li>
          </ul>
=======
        <ul className="navbar-nav mr-auto">
    
          <li className="navbar-item">
          <Link to="/pharma/pharmacist/AvailableMedicine" className="nav-link">Available Medicine</Link>
          </li>
          <li className="navbar-item">
          <Link to="/pharma/pharmacist/addMed" className="nav-link">Add new medicine</Link>
          </li>
    
          
        </ul>
>>>>>>> 1dcd1821573b0c683c64c4b7dd01e515198ecd1e
        </div>
      </nav>
    );
  }
}
