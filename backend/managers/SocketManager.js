//SocketManager.js - Gerencia conexões e eventos de socket
import Game from '../models/Game.js';

class SocketManager {
  constructor(io, databaseManager) {
    this.io = io;
    this.databaseManager = databaseManager;
    this.activeGames = new Map();
    this.socketToGameMap = new Map();
    
    this.setupSocketEvents();
  }

  //Configurar eventos de socket
  setupSocketEvents() {
    this.io.on('connection', (socket) => {
      console.log('Usuário conectado:', socket.id);

      // Usuário entra no torneio
      socket.on('tournament:join', (data) => this.handleJoinTournament(socket, data));
      
      // Iniciar torneio
      socket.on('tournament:start', () => this.handleStartTournament(socket));

      // Jogador faz jogada
      socket.on('game:move', (data) => this.handleGameMove(socket, data));
      
      // Desconexão
      socket.on('disconnect', () => this.handleDisconnect(socket));
    });
  }

  async handleJoinTournament(socket, { playerName }) {
    try {
      let gameId;
      let game;
      let isLeader = false;

      // Procurar por um jogo existente que ainda não começou
      for (const [id, existingGame] of this.activeGames.entries()) {
        if (!existingGame.started) {
          gameId = id;
          game = existingGame;
          break;
        }
      }

      // Se nenhum jogo ativo for encontrado, criar um novo
      if (!gameId) {
        gameId = await this.databaseManager.createGame();
        isLeader = true;
        
        game = new Game(gameId, this.databaseManager.getDatabase());
        this.activeGames.set(gameId, game);
      }

      // Adicionar jogador ao jogo
      const player = await game.addPlayer(socket.id, playerName, isLeader);
      
      // Mapear o ID do socket ao ID do jogo
      this.socketToGameMap.set(socket.id, gameId);
      
      // Entrar na sala do jogo
      socket.join(`game:${gameId}`);
      
      // Enviar lista atualizada de jogadores
      this.io.to(`game:${gameId}`).emit('tournament:players', {
        players: game.getPlayersJSON(),
        gameId
      });
      
    } catch (error) {
      console.error('Erro ao entrar no torneio:', error);
      socket.emit('error', { message: 'Erro ao entrar no torneio' });
    }
  }

  async handleStartTournament(socket) {
    try {
      const gameId = this.socketToGameMap.get(socket.id);
      
      if (!gameId) {
        socket.emit('error', { message: 'Você não faz parte de nenhum jogo' });
        return;
      }
      
      const game = this.activeGames.get(gameId);
      
      if (!game) {
        socket.emit('error', { message: 'Jogo não encontrado' });
        return;
      }

      // Verificar se o jogador é o líder
      if (!game.isPlayerLeader(socket.id)) {
        socket.emit('error', { message: 'Apenas o líder pode iniciar o torneio' });
        return;
      }
      
      // Iniciar o torneio
      game.startTournament();
      
      // Iniciar a contagem regressiva
      this.io.to(`game:${gameId}`).emit('tournament:starting', { countdown: 3 });
      
      // Após a contagem regressiva, iniciar a primeira partida
      setTimeout(() => {
        const matchData = game.startMatch();
        
        this.io.to(`game:${gameId}`).emit('game:started', matchData);
      }, 3000);
      
    } catch (error) {
      console.error('Erro ao iniciar o torneio:', error);
      socket.emit('error', { message: 'Erro ao iniciar o torneio' });
    }
  }

  async handleGameMove(socket, { position }) {
    try {
      const gameId = this.socketToGameMap.get(socket.id);
      
      if (!gameId) {
        socket.emit('error', { message: 'Você não faz parte de nenhum jogo' });
        return;
      }
      
      const game = this.activeGames.get(gameId);
      
      if (!game || !game.started) {
        socket.emit('error', { message: 'Jogo não encontrado ou não iniciado' });
        return;
      }

      // Registrar a jogada
      const result = await game.makeMove(socket.id, position);
      
      if (result.error) {
        socket.emit('error', { message: result.error });
        return;
      }
      
      // Enviar atualização do tabuleiro para todos
      this.io.to(`game:${gameId}`).emit('game:updated', {
        board: result.board,
        currentPlayer: result.currentPlayer
      });
      
      // Se a partida terminou
      if (result.matchEnded) {
        // Enviar resultado da partida
        this.io.to(`game:${gameId}`).emit('tournament:matchEnded', {
          winner: result.winner,
          scores: result.scores
        });
        
        // Se o torneio terminou
        if (result.tournamentEnded) {
          this.handleTournamentOver(gameId, game);
        } else {
          // Iniciar próxima partida após um delay
          setTimeout(() => {
            const nextMatch = game.startNextMatch();
            this.io.to(`game:${gameId}`).emit('game:started', nextMatch);
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Erro ao processar jogada:', error);
      socket.emit('error', { message: 'Erro ao processar jogada' });
    }
  }

  async handleTournamentOver(gameId, game) {
    try {
      const finalResult = await game.finishTournament();
      
      this.io.to(`game:${gameId}`).emit('tournament:ended', finalResult);
      
      // Remover o jogo após algum tempo
      setTimeout(() => {
        if (this.activeGames.has(gameId)) {
          game.getPlayersJSON().forEach(player => {
            this.socketToGameMap.delete(player.socketId);
          });
          
          this.activeGames.delete(gameId);
        }
      }, 60000);
    } catch (error) {
      console.error('Erro ao encerrar o torneio:', error);
    }
  }

  async handleDisconnect(socket) {
    try {
      console.log('Usuário desconectado:', socket.id);
      
      const gameId = this.socketToGameMap.get(socket.id);
      
      if (gameId) {
        const game = this.activeGames.get(gameId);
        
        if (game) {
          // Remover jogador do jogo
          const players = await game.removePlayer(socket.id);
          
          // Se ainda há jogadores e o jogo não começou, atualizar a lista
          if (players.length > 0) {
            if (!game.started) {
              this.io.to(`game:${gameId}`).emit('tournament:players', {
                players: game.getPlayersJSON(),
                gameId
              });
            }
          } else {
            // Se não há mais jogadores, remover o jogo
            this.activeGames.delete(gameId);
          }
        }
        
        // Remover o mapeamento de socket para jogo
        this.socketToGameMap.delete(socket.id);
      }
    } catch (error) {
      console.error('Erro ao lidar com desconexão:', error);
    }
  }
}

export default SocketManager;
