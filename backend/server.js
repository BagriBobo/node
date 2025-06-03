import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import DatabaseManager from './managers/DatabaseManager.js';
import SocketManager from './managers/SocketManager.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5174", "http://127.0.0.1:5174"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: ["http://localhost:5174", "http://127.0.0.1:5174"],
  credentials: true
}));
app.use(express.json());

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rota de teste
app.get('/test', (req, res) => {
  res.json({ message: 'Servidor do Jogo da Velha funcionando!' });
});

/*
 * Inicializar gerenciador de banco de dados e socket
 * O gerenciador de banco de dados é responsável por conectar ao banco de dados e executar consultas.
 * Ele deve ser inicializado antes de qualquer operação de banco de dados.
 * O gerenciador de socket é responsável por gerenciar as conexões WebSocket.
 * Ele deve ser inicializado após o banco de dados estar conectado.
 */
const databaseManager = new DatabaseManager();
let dbInitialized = false;

databaseManager.initialize()
  .then(() => {
    console.log("Database inicializada e conectada com sucesso!");
    dbInitialized = true;
    
    //Inicializar gerenciador de socket
    const socketManager = new SocketManager(io, databaseManager);
  })
  .catch(err => {
    console.error("Failed to initialize database:", err);
  });

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor do Jogo da Velha rodando em http://localhost:${PORT}`);
  console.log('CORS configurado para:', io._opts.cors.origin);
});

export { app, server };
