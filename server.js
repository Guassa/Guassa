const express = require('express');

const app = express();
const server = app.listen(process.env.PORT);

const socket = require('socket.io');

const io = socket(server);

const newConnection = socket => {
  socket.on('send', data => socket.broadcast.emit('receive', data));
  socket.on('namechange', message => io.sockets.emit('namechanged', message));
}

io.sockets.on('connection', newConnection);
