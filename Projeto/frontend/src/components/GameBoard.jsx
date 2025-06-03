import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

const GameBoard = ({ matchId, player1, player2 }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState(null);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStatus, setGameStatus] = useState('waiting'); // waiting, playing, finished
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('game:started', (data) => {
      console.log('Jogo iniciado:', data);
      setGameStatus('playing');
      setCurrentTurn(data.currentTurn);
      setTimeLeft(60);
    });

    socket.on('game:updated', (data) => {
      console.log('Jogo atualizado:', data);
      setBoard(data.board);
      setCurrentTurn(data.currentTurn);
      setScores(data.scores);
      setCurrentRound(data.currentRound);
    });

    socket.on('tournament:matchEnded', (data) => {
      console.log('Partida finalizada:', data);
      setGameStatus('finished');
    });

    // Timer para o round
    let timer;
    if (gameStatus === 'playing') {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      socket.off('game:started');
      socket.off('game:updated');
      socket.off('tournament:matchEnded');
      if (timer) clearInterval(timer);
    };
  }, [socket, gameStatus]);

  const handleCellClick = (index) => {
    if (board[index] === null && currentTurn === socket.id && gameStatus === 'playing') {
      console.log('Fazendo movimento:', index);
      socket.emit('game:move', {
        matchId,
        position: index
      });
    }
  };

  const renderCell = (index) => {
    const value = board[index];
    const isCurrentTurn = currentTurn === socket.id;
    const isDisabled = value !== null || !isCurrentTurn || gameStatus !== 'playing';

    return (
      <button
        className={`cell ${isDisabled ? 'disabled' : ''}`}
        onClick={() => handleCellClick(index)}
        disabled={isDisabled}
      >
        {value === player1.id ? 'X' : value === player2.id ? 'O' : ''}
      </button>
    );
  };

  const getPlayerInfo = (playerId) => {
    if (playerId === player1.id) return player1;
    if (playerId === player2.id) return player2;
    return null;
  };

  const currentPlayer = getPlayerInfo(currentTurn);

  return (
    <div className="game-board">
      <div className="game-info">
        <h3>Round {currentRound}/3</h3>
        <p>Tempo restante: {timeLeft}s</p>
        <div className="scores">
          <p className={currentTurn === player1.id ? 'active-player' : ''}>
            {player1.nickname}: {scores.player1}
          </p>
          <p className={currentTurn === player2.id ? 'active-player' : ''}>
            {player2.nickname}: {scores.player2}
          </p>
        </div>
        {gameStatus === 'playing' && currentPlayer && (
          <p className="current-turn">
            Vez de: {currentPlayer.nickname}
          </p>
        )}
      </div>
      <div className="board">
        {board.map((_, index) => (
          <div key={index} className="cell-container">
            {renderCell(index)}
          </div>
        ))}
      </div>
      {gameStatus === 'finished' && (
        <div className="game-over">
          <h2>Partida Finalizada!</h2>
          <p>Voltando para a sala de espera...</p>
        </div>
      )}
    </div>
  );
};

export default GameBoard; 