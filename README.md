# Quiz em Tempo Real com Placar

Este projeto consiste em uma aplicação de quiz em tempo real onde vários jogadores podem participar e competir para ver quem responde mais rápido e corretamente às perguntas.

## Visão Geral

O Quiz em Tempo Real é um sistema multiplayer que permite que jogadores conectados simultaneamente participem de um quiz competitivo. A aplicação utiliza WebSockets para garantir a comunicação em tempo real entre os jogadores, criando uma experiência dinâmica e interativa.

> **Nota**: O repositório também contém projetos adicionais em `/contexto` e `/redux` que demonstram conceitos específicos de React. Consulte os README.md específicos nessas pastas para mais detalhes.

## Estrutura do Projeto

```
/
├── backend/              #Servidor Node.js com Express e Socket.IO
│   ├── managers/         #Gerenciadores (Database, Socket)
│   ├── models/           #Modelos de dados (Game, Player)
│   └── server.js         #Ponto de entrada do servidor
├── frontend/             #Aplicação React
│   ├── src/
│   │   ├── components/   #Componentes React da interface
│   │   ├── context/      #Contextos React (Game, Socket)
│   │   └── App.jsx       #Componente principal
│   └── index.html        #Página HTML principal
├── contexto/             #Projeto de demonstração de Context API (README próprio)
└── redux/                #Projeto de demonstração de Redux (README próprio)
```

## Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web para Node.js
- **Socket.IO**: Biblioteca para comunicação em tempo real
- **SQLite**: Banco de dados leve e embarcado

### Frontend
- **React**: Biblioteca JavaScript para construção de interfaces
- **Socket.IO Client**: Cliente para comunicação em tempo real

## Componentes Principais

### Backend

#### Server.js
O ponto de entrada do servidor que configura o Express e o Socket.IO.

#### DatabaseManager.js
Gerencia a conexão com o banco de dados SQLite e fornece métodos para manipulação dos dados.

#### SocketManager.js
Controla a comunicação em tempo real, gerenciando eventos de conexão, desconexão e troca de mensagens.

#### Game.js
Modelo que representa a lógica do jogo, incluindo estados, perguntas e pontuação.

#### Player.js
Modelo que representa um jogador, com informações como ID, nome e pontuação.

### Frontend

#### InitialScreen.jsx
Tela inicial onde os jogadores inserem seus nomes para entrar no lobby.

#### LobbyScreen.jsx
Sala de espera onde os jogadores aguardam até que o líder inicie o jogo.

#### CountdownScreen.jsx
Tela de contagem regressiva exibida antes do início de cada rodada.

#### QuestionScreen.jsx
Tela que exibe a pergunta atual e as opções de resposta.

#### QuestionResultsScreen.jsx
Exibe os resultados de cada pergunta, mostrando quem respondeu corretamente.

#### GameOverScreen.jsx
Tela final que mostra o placar completo e os vencedores.

## Funcionalidades

1. **Tela Inicial**: Jogadores inserem seus nomes para entrar no lobby
2. **Lobby**: Os jogadores esperam o líder iniciar o jogo
3. **Quiz**: Perguntas aparecem em sequência, pontuação baseada na velocidade de resposta
4. **Placar**: Resultado final mostrando a pontuação de todos os jogadores
5. **Sistema de Liderança**: O primeiro jogador se torna líder e controla o início do jogo
6. **Pontuação Dinâmica**: Pontos atribuídos com base na velocidade e precisão das respostas

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

## Fluxo do Jogo

1. O primeiro jogador a entrar se torna o líder
2. O líder inicia o jogo quando todos os participantes estiverem prontos
3. Contagem regressiva de 3 segundos
4. Perguntas aparecem uma de cada vez
5. Jogadores recebem pontos com base na velocidade de resposta (100 pontos para o mais rápido, decrescendo)
6. Ao final das perguntas, o placar final é exibido

## Comunicação em Tempo Real

A comunicação entre o backend e o frontend é feita através de eventos Socket.IO:

- `player:join` - Quando um jogador entra no jogo
- `game:start` - Quando o líder inicia o jogo
- `question:new` - Quando uma nova pergunta é enviada
- `question:answer` - Quando um jogador responde uma pergunta
- `game:over` - Quando todas as perguntas foram respondidas