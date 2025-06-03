const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const SocketManager = require('./managers/SocketManager');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5174", "http://127.0.0.1:5174"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rota de teste
app.get('/test', (req, res) => {
  res.json({ message: 'Servidor funcionando!' });
});

// Inicializa o gerenciador de sockets
const socketManager = new SocketManager(io);

const PORT = 3000; // Porta fixa

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('CORS configurado para:', io._opts.cors.origin);
}); 