
var express = require('express');

var app = express();
var server = app.listen(process.env.PORT);

app.use(express.static('public'));

console.log('Server is running');

var socket = require('socket.io');

var io = socket(server);

var online = 0;

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  online++;
  console.log('newConnection ' + socket.id);
  console.log(online + " persons are online");
  socket.emit('here', online);
  socket.on('send', sendMsg);
  socket.on('somethinghapenswithaname', somethinghapenswithanameMsg);

  function sendMsg(data) {
    socket.broadcast.emit('receive', data);
    console.log(data);
  }

  function somethinghapenswithanameMsg(newname) {
    io.sockets.emit('somethinghapenswithaname', newname);
    console.log(newname);
  }

  socket.on('disconnect', newDisconnection);

  function newDisconnection() {
    online--;
     console.log(socket.id + ' Got disconnect!');
     console.log(online + " persons are online");
     socket.emit('here', online);
  }
}
