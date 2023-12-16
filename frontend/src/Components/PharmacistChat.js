import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const PharmacistChat = ({ username }) => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const socket = io.connect('http://localhost:3001'); // Update with your server URL

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', { room, username });
    }
  };

  const sendMessage = () => {
    socket.emit('send_message', { message, room, username });
  };

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
      <input
        placeholder="Room Number..."
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => setMessage(event.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h2>Message: {messageReceived}</h2>
    </div>
  );
};

export default PharmacistChat;
