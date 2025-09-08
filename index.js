//? Imports
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';

dotenv.config();

//? Instances
const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = new Server(server);

//? Serving HTML File
const __dirname = dirname(fileURLToPath(import.meta.url));

//? Define a connection event handler
//* whenever new client establishes new connection, this event happend and we get socket object in the callback as parameter which
//* represents that client.

io.on('connection', (socket) => {
  console.log('New Client connects to Server');
});

//? Routes
app.get('/', (req, res) => {
  return res.sendFile(join(__dirname, 'index.html'));
});

//? Start the server
server.listen(port, () => {
  console.log(`App is listening on Port: ${port}`);
});
