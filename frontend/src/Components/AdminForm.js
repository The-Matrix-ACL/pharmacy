import React, { useState } from 'react';
import axios from 'axios';

function AdminForm() {
  const [adminData, setAdminData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace the URL with the correct endpoint on your server for adding administrators
      const response = await axios.post('http://localhost:8000/addAdmin', adminData);

      if (response.status === 201) {
        alert("Administrator added successfully");
        // Optionally, you can reset the form fields here
        setAdminData({
          username: '',
          password: '',
        });
      } else if (response.status === 400) {
        alert("Username already exists");
      } else {
        console.error("Failed to add the administrator.");
      }
    } catch (error) {
      console.error("Error adding the administrator:", error);
    }
  };

  return (
    <div className="AdminForm">
      <h2>Admin Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={adminData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={adminData.password}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Administrator</button>
      </form>
    </div>
  );
}

export default AdminForm;
