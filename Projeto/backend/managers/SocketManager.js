const Tournament = require('../models/Tournament');
const Game = require('../models/Game');

class SocketManager {
  constructor(io) {
    this.io = io;
    this.tournament = new Tournament();
    this.activeGames = new Map(); // Map<matchId, Game>
    this.setupSocketEvents();
  }

  setupSocketEvents() {
    this.io.on('connection', (socket) => {
      console.log('Novo jogador conectado:', socket.id);

      // Evento de entrada no torneio
      socket.on('tournament:join', (nickname) => {
        if (this.tournament.addPlayer(socket.id, nickname)) {
          socket.emit('tournament:joined', {
            id: socket.id,
            nickname: nickname
          });

          // Notifica todos sobre o novo jogador
          this.io.emit('tournament:players', {
            players: this.tournament.getWaitingPlayers(),
            canStart: this.tournament.canStart()
          });
        }
      });

      // Evento de início do torneio
      socket.on('tournament:start', () => {
        if (this.tournament.canStart()) {
          this.tournament.generateBrackets();
          
          // Inicia a primeira partida
          const firstMatch = this.tournament.getNextMatch();
          if (firstMatch) {
            const game = new Game();
            game.addPlayer(firstMatch.player1.id);
            game.addPlayer(firstMatch.player2.id);
            this.activeGames.set(firstMatch.id, game);
            firstMatch.status = 'in_progress';

            // Notifica os jogadores sobre o início da partida
            this.io.to(firstMatch.player1.id).to(firstMatch.player2.id).emit('game:started', {
              matchId: firstMatch.id,
              player1: firstMatch.player1,
              player2: firstMatch.player2,
              currentTurn: game.currentTurn
            });
          }

          this.io.emit('tournament:started', {
            matches: this.tournament.matches
          });
        }
      });

      // Evento de movimento no jogo
      socket.on('game:move', (data) => {
        const game = this.activeGames.get(data.matchId);
        if (game && game.makeMove(data.position, socket.id)) {
          // Notifica os jogadores sobre o movimento
          this.io.to(data.matchId).emit('game:updated', {
            board: game.board,
            currentTurn: game.currentTurn,
            scores: game.scores,
            currentRound: game.currentRound
          });

          // Verifica se o round acabou
          if (game.checkWinner() || game.isBoardFull() || game.isRoundTimeUp()) {
            const winner = game.endRound();
            if (winner) {
              this.tournament.updateMatchResult(data.matchId, winner);
              this.io.emit('tournament:matchEnded', {
                matchId: data.matchId,
                winner: winner
              });
              this.activeGames.delete(data.matchId);

              // Inicia a próxima partida se houver
              const nextMatch = this.tournament.getNextMatch();
              if (nextMatch) {
                const newGame = new Game();
                newGame.addPlayer(nextMatch.player1.id);
                newGame.addPlayer(nextMatch.player2.id);
                this.activeGames.set(nextMatch.id, newGame);
                nextMatch.status = 'in_progress';

                this.io.to(nextMatch.player1.id).to(nextMatch.player2.id).emit('game:started', {
                  matchId: nextMatch.id,
                  player1: nextMatch.player1,
                  player2: nextMatch.player2,
                  currentTurn: newGame.currentTurn
                });
              }
            }
          }
        }
      });

      // Evento de desconexão
      socket.on('disconnect', () => {
        console.log('Jogador desconectado:', socket.id);
        // Remove o jogador do torneio
        this.tournament.players = this.tournament.players.filter(p => p.id !== socket.id);
        this.io.emit('tournament:players', {
          players: this.tournament.getWaitingPlayers(),
          canStart: this.tournament.canStart()
        });
      });
    });
  }
}

module.exports = SocketManager; 