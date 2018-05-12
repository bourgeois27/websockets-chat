const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const users = [];
const connections = [];

app.use(express.static(path.join(__dirname, 'public')));

io.sockets.on('connection', (socket) => {
  // connect
  connections.push(socket);
  let nbConnection = connections.length;
  console.log(`There ${(nbConnection < 2) ? `is ${connections.length} socket` : `are ${connections.length} sockets`} connected`);

  // disconnect
  socket.on('disconnect', (data) => {
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    let nbConnection = connections.length;
    console.log(`There ${(nbConnection < 2) ? `is ${connections.length} socket` : `are ${connections.length} sockets`} connected`);
  });

  // send messages
  socket.on('send message', (data) => {
    io.sockets.emit('new message', { msg: data, user: socket.username });
  });

  // sign in
  socket.on('new user', (data, callback) => {
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateUsernames();
  });

  // repaint
  const updateUsernames = () => {
    io.sockets.emit('get users', users);
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
