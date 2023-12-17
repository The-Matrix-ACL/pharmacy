import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const PharmacistChat = ({ username }) => {
    // Open the Zoom meeting link in a new tab
    window.open('https://us05web.zoom.us/j/8011145782?pwd=6qQZprzfr11od523tbsaZ8bL4IMdLg.1', '_blank');


  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });

    return () => {
      socket.disconnect(); // Clean up when component unmounts
    };
  }, [socket]);

  return (
    <div>
      <h1>Pharmacist Chat</h1>
      <button onClick={joinZoomMeeting}>Join Zoom Meeting</button>
    </div>
  );
};

export default PharmacistChat;
