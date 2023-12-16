import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Wallet() {
  const [walletCredit, setWalletCredit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  const username = localStorage.getItem('username');

  useEffect(() => {
    // You can use the 'username' value here if needed
    console.log(username);
  }, [username]);

  const fetchWalletCredit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/getWalletCredit`, {
        username,
      });

      setWalletCredit(response.data.WalletCredit);
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/payWithWallet`, {
        amount: Number(paymentAmount),
        username,
      });

      if (response.data.success) {
        setWalletCredit(response.data.newWalletCredit);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Wallet Credit: ${walletCredit}</h2>
      <button onClick={fetchWalletCredit}>Check Wallet Credit</button>
      <input
        type="number"
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handlePayment}>Pay</button>
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
}

export default Wallet;
