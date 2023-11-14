import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Medications() {
  const [Meds, setMeds] = useState([]);

  useEffect(() => {
    // Fetch pharmacist requests when the component mounts
    async function fetchMeds() {
      try {
        const response = await axios.get('http://localhost:8000/AvailableMedicine');
        if (response.status === 200) {
          setMeds(response.data);
        } else {
          console.error("Failed to fetch meds.");
        }
      } catch (error) {
        console.error("Error fetching meds:", error);
      }
    }

    fetchMeds();
  }, []);

  const handleAddToCart = async (userId,medId) => {
    try {

     await axios.post(`http://localhost:8000/AddToCart/${userId}/${medId}`);
     
    } catch (error) {
      console.error("Error :", error);
    }
  };

  
const userId = localStorage.getItem('userId')
console.log(localStorage)
  

  return (
    <div className="Medications">
      <h2>Meds</h2>
      <table>
        <thead>
          <tr>
          <th>Name</th>
                  <th>Price</th>
                  <th>Ingredients</th>
                  <th>Usage</th>
                  <th>description</th>
                  <th>Picture</th>
                  <th>Amount</th>
                  <th>Sales</th>
          </tr>
        </thead>
        <tbody>
          {Meds.map((Meds) => (
            <tr key={Meds._id}>
              <td>{Meds.name}</td>
              <td>{Meds.price}</td>
              <td>{Meds.ingredients}</td>
              <td>{Meds.usage}</td>
              <td>{Meds.description}</td>
              <td>{Meds.picture}</td>
              <td>{Meds.amount}</td>
              <td>{Meds.sales}</td>
              <td>
                <button onClick={() => handleAddToCart(userId, Meds._id)}>
                  Add to cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Medications;
