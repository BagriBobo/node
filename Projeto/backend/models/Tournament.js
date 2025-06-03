class Tournament {
  constructor() {
    this.players = [];
    this.matches = [];
    this.status = 'waiting'; // waiting, in_progress, finished
    this.currentRound = 0;
  }

  addPlayer(playerId, nickname) {
    if (this.status === 'waiting' && this.players.length < 32) { // Limite máximo de jogadores
      this.players.push({
        id: playerId,
        nickname: nickname,
        status: 'waiting' // waiting, playing, eliminated
      });
      return true;
    }
    return false;
  }

  canStart() {
    return this.players.length >= 6 && this.players.length % 2 === 0;
  }

  generateBrackets() {
    if (!this.canStart()) return false;

    // Embaralha os jogadores
    const shuffledPlayers = [...this.players].sort(() => Math.random() - 0.5);
    
    // Cria as partidas
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      if (i + 1 < shuffledPlayers.length) {
        this.matches.push({
          id: `match_${this.matches.length}`,
          player1: shuffledPlayers[i],
          player2: shuffledPlayers[i + 1],
          winner: null,
          rounds: [],
          status: 'waiting' // waiting, in_progress, finished
        });
      }
    }

    this.status = 'in_progress';
    return true;
  }

  getWaitingPlayers() {
    return this.players.filter(p => p.status === 'waiting');
  }

  getActiveMatches() {
    return this.matches.filter(m => m.status === 'in_progress');
  }

  getNextMatch() {
    return this.matches.find(m => m.status === 'waiting');
  }

  updateMatchResult(matchId, winnerId) {
    const match = this.matches.find(m => m.id === matchId);
    if (match) {
      match.winner = winnerId;
      match.status = 'finished';
      
      // Atualiza status dos jogadores
      const loser = match.player1.id === winnerId ? match.player2 : match.player1;
      loser.status = 'eliminated';
      
      // Se for o último match, finaliza o torneio
      if (this.matches.every(m => m.status === 'finished')) {
        this.status = 'finished';
      }
    }
  }
}

module.exports = Tournament; 