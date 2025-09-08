import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

io.on('connection', (socket) => {
  console.log('New Client connects to Server ✔');

  socket.on('disconnect', () => {
    console.log('Client disconnected from Server ❌');
  });

  socket.on('newMessage', (message) => {
    console.log('New Message from Client', message);
    io.emit('newMessage', message);
  });
});

app.get('/', (req, res) => {
  return res.sendFile(join(__dirname, 'index.html'));
});

server.listen(port, () => {
  console.log(`App is listening on Port: ${port}`);
});
