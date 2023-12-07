import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(`http://localhost:8000/patient/getCart/${userId}`);
        if (response.status === 200) {
          setCart(response.data);
        } else {
          console.error("Failed to fetch cart.");
        }
      } catch (error) {
        console.error("Error fetching cart", error);
      }
    }

    fetchCart();
  }, []);

  const handleCheckout = async (userId) => {
    try {

     await axios.post(`http://localhost:8000/checkoutOrder/${userId}`);
     
    } catch (error) {
      console.error("Error :", error);
    }
  };


  let meds = cart.medications;
  let bill = cart.bill;
  
  

  return (
    <div className="Cart">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Loading cart...</p>
      ) : (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {meds.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>

            </tr>
          ))}
        </tbody>
      </table>
      )}
      <td>
                <button onClick={() => handleCheckout(userId)}>
                 Checkout Order
                </button>
              </td>
    </div>
  );
}

export default Cart;
