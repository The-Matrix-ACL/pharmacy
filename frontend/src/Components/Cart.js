import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch pharmacist requests when the component mounts
    async function fetchCart() {
      try {
        const response = await axios.get('http://localhost:8000/pharma/patient/getCart/:id');
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

  

  
  

  return (
    <div className="Cart">
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((cart) => (
            <tr key={cart._id}>
              <td>{cart.name}</td>
              <td>{cart.price}</td>
              <td>{cart.quantity}</td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Cart;
