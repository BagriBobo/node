# Jogo da Velha Multiplayer

Este projeto é um jogo da velha multiplayer que utiliza WebSockets para comunicação em tempo real entre os jogadores.

## Estrutura do Projeto

```
/
├── backend/
│   ├── managers/
│   │   └── SocketManager.js      # Gerencia conexões e eventos do WebSocket
│   ├── models/
│   │   └── Game.js               # Modelo genérico do jogo da velha
│   └── server.js                 # Configuração do Express e Socket.IO
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── SocketContext.jsx # Contexto React para o WebSocket
│   │   └── App.jsx               # Estrutura base do app React
│   └── index.html
└── README.md
```

## Como Executar

### Backend

```bash
cd backend
npm install
npm run dev
```

O servidor backend será iniciado na porta 3000.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação frontend estará disponível em: http://localhost:5173 