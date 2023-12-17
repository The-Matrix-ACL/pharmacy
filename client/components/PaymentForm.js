import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import StripeCheckout from 'react-stripe-checkout';

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cashPaymentMessage, setCashPaymentMessage] = useState('');

  const handleToken = async (token, addresses) => {
    if (paymentMethod === 'cash') {
      // Handle the cash payment logic here
      console.log('Paid in cash');
      setCashPaymentMessage('Payment received in cash.');
      return;
    }

    const response = await fetch('/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token.id,
        amount: 1000,
      }),
    });

    const data = await response.json();
    if (data.success) {
      console.log('Payment successful', data);
    } else {
      console.error('Payment error', data.error);
    }
  };

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51K8pKeAHoHtEwtN5PmpH89COOO1E8kd0TT27PiU2NovDU5RPHP20Q2EXUjzstNx6yhBMwir9egTX1tCwO3D3ebvD00QujcIxos"
        token={handleToken}
        amount={1000}
        name="Your Product Name"
      />

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setPaymentMethod('cash')}>Pay in Cash</button>
        <button type="submit" onClick={() => window.location.href = `/getWalletCredit`}>Wallet</button>
      </div>

      {cashPaymentMessage && (
        <div style={{ marginTop: '10px', color: 'green' }}>
          {cashPaymentMessage}
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
