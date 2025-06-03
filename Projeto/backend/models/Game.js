class Game {
  constructor() {
    this.board = Array(9).fill(null);
    this.players = [];
    this.currentTurn = null;
    this.rounds = [];
    this.currentRound = 0;
    this.scores = { player1: 0, player2: 0 };
    this.roundStartTime = null;
    this.roundDuration = 60000; // 1 minuto em milissegundos
  }

  addPlayer(playerId) {
    if (this.players.length < 2) {
      this.players.push(playerId);
      if (this.players.length === 2) {
        this.currentTurn = this.players[0];
        this.startNewRound();
      }
    }
  }

  startNewRound() {
    this.board = Array(9).fill(null);
    this.currentTurn = this.players[0];
    this.roundStartTime = Date.now();
    this.rounds.push({
      board: [...this.board],
      moves: [],
      winner: null
    });
    this.currentRound++;
  }

  makeMove(position, playerId) {
    if (this.board[position] === null && this.currentTurn === playerId) {
      this.board[position] = playerId;
      this.currentTurn = this.players.find(id => id !== playerId);
      
      // Registra o movimento no round atual
      this.rounds[this.currentRound - 1].moves.push({
        position,
        player: playerId,
        timestamp: Date.now()
      });

      // Verifica se o round acabou
      if (this.checkWinner() || this.isBoardFull()) {
        this.endRound();
      }

      return true;
    }
    return false;
  }

  checkWinner() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontais
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticais
      [0, 4, 8], [2, 4, 6] // diagonais
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return this.board[a];
      }
    }
    return null;
  }

  isBoardFull() {
    return this.board.every(cell => cell !== null);
  }

  endRound() {
    const winner = this.checkWinner();
    this.rounds[this.currentRound - 1].winner = winner;
    
    if (winner) {
      if (winner === this.players[0]) {
        this.scores.player1++;
      } else {
        this.scores.player2++;
      }
    }

    // Se alguém ganhou 2 rounds ou é o último round
    if (this.scores.player1 >= 2 || this.scores.player2 >= 2 || this.currentRound >= 3) {
      return this.getWinner();
    }

    // Se não, inicia novo round
    this.startNewRound();
    return null;
  }

  getWinner() {
    if (this.scores.player1 >= 2) return this.players[0];
    if (this.scores.player2 >= 2) return this.players[1];
    return null;
  }

  isRoundTimeUp() {
    return Date.now() - this.roundStartTime >= this.roundDuration;
  }

  reset() {
    this.board = Array(9).fill(null);
    this.currentTurn = this.players[0];
    this.rounds = [];
    this.currentRound = 0;
    this.scores = { player1: 0, player2: 0 };
    this.startNewRound();
  }
}

module.exports = Game; 