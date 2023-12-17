import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WalletViewerPharmacist() {
  const [walletCredit, setWalletCredit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const username = localStorage.getItem('username');

  useEffect(() => {
    // You can use the 'username' value here if needed
    console.log(username);
    fetchWalletCredit();
  }, [username]);

  const fetchWalletCredit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/PharmacistGetWalletCredit`, {
        username,
      });

      setWalletCredit(response.data.WalletCredit);
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Wallet Credit Viewer</h2>
      <button onClick={fetchWalletCredit}>View Wallet Credit</button>
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <div>Wallet Credit for {username}: ${walletCredit}</div>
    </div>
  );
}

export default WalletViewerPharmacist;
