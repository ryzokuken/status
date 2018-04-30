const http = require('http');
const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const netstat = require('node-netstat');

const app = express();
app.use(cors());
const server = http.Server(app);
const io = socket(server);

server.listen(8000);

const payload = {};

netstat(
  {
    watch: true
  },
  data => {
    const key = data.protocol + data.local.port;
    payload[key] = data;
    io.to('common').emit('status', {key: key, data: data});
  }
);

app.get('/payload', (req, res) => {
  res.json(payload);
});

io.on('connection', socket => {
  console.log(`Socket ${socket.id} connected!`);
  socket.join('common');
});
