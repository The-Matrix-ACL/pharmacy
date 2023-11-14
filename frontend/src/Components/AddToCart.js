import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CartItem() {
   

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
   
  
  
    useEffect(() => {
        // Fetch addresses when the component mounts
        fetchItem();
      }, );
  
  
  
    const fetchItem = async (userId, medId) => {
        
      try {
        const response = await axios.post(`http://localhost:8000/addToCart/${userId}/${medId}`, {
          name,
          price,
          quantity,
        });
    
        setName(response.data.name);
        setPrice(response.data.price);
        setQuantity(response.data.quantity);
      } catch (error) {
        // Log the entire error object for detailed information
        console.error('Error adding item:', error);
      }
    };
    return (
        <div>
        <h3>cart item</h3>

          <thead className="thead-light">
            <tr>
            <p>name: {name}</p>
            <p>price: {price}</p>
            <p>quantity: {quantity}</p>
            </tr>
          </thead>
      </div>
    );
  }
  
  export default CartItem;
  