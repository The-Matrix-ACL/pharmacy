// chatServer.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const chatApp = express();
chatApp.use(cors());
const chatServer = http.createServer(chatApp);
const chatIO = new Server(chatServer, {
 cors: {
    origin: "http://localhost:3000", // Update with your frontend's origin
    methods: ["GET", "POST"],
 },
});

chatIO.on("connection", (socket) => {
 console.log(`User Connected: ${socket.id}`);

 socket.on("join_room", (data) => {
    socket.join(data);
 });

 socket.on("send_message", (data) => {
    try {
      socket.to(data.room).emit("receive_message", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
 });
});

module.exports = { server: chatServer, io: chatIO };