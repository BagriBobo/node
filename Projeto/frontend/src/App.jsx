import React, { useState, useEffect } from 'react';
import { SocketProvider, useSocket } from './context/SocketContext';
import WaitingRoom from './components/WaitingRoom';
import GameBoard from './components/GameBoard';

const Tournament = () => {
  const [tournamentState, setTournamentState] = useState('waiting'); // waiting, in_progress, finished
  const [currentMatch, setCurrentMatch] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('tournament:started', (data) => {
      setTournamentState('in_progress');
      setCurrentMatch(data.matches[0]);
    });

    socket.on('tournament:matchEnded', (data) => {
      // Atualiza o estado do torneio
      setCurrentMatch(null);
    });

    return () => {
      socket.off('tournament:started');
      socket.off('tournament:matchEnded');
    };
  }, [socket]);

  return (
    <div className="tournament">
      {tournamentState === 'waiting' && <WaitingRoom />}
      {tournamentState === 'in_progress' && currentMatch && (
        <GameBoard
          matchId={currentMatch.id}
          player1={currentMatch.player1}
          player2={currentMatch.player2}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <SocketProvider>
      <div className="app">
        <h1>Torneio de Jogo da Velha</h1>
        <Tournament />
      </div>
    </SocketProvider>
  );
};

export default App; 