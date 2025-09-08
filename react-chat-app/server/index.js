import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
  console.log('New Client connects to Server ✔');

  socket.on('newMessage', (message) => {
    io.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected from Server ❌');
  });
});

server.listen(port, () => {
  console.log(`App is listening on Port: ${port}`);
});
