const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

server.listen(3000);

app.use(express.static(path.join(__dirname, 'public')));

const connectedUsers = [];

io.on('connect', (socket) => {
  console.log('Connection ok');

  socket.on('join-request', (userName) => {
    socket.userName = userName;
    connectedUsers.push(userName);
    console.log(connectedUsers);

    socket.emit('user-ok', connectedUsers);
  });
});
