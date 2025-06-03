import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

const WaitingRoom = () => {
  const [nickname, setNickname] = useState('');
  const [players, setPlayers] = useState([]);
  const [canStart, setCanStart] = useState(false);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState('');
  const { socket, connectionStatus } = useSocket();

  useEffect(() => {
    if (!socket) {
      setError('Aguardando conexão com o servidor...');
      return;
    }

    if (connectionStatus === 'error') {
      setError('Erro ao conectar com o servidor. Tentando reconectar...');
      return;
    }

    if (connectionStatus === 'disconnected') {
      setError('Desconectado do servidor. Tentando reconectar...');
      return;
    }

    setError('');

    socket.on('tournament:joined', (data) => {
      console.log('Jogador entrou:', data);
      setJoined(true);
    });

    socket.on('tournament:players', (data) => {
      console.log('Lista de jogadores atualizada:', data);
      setPlayers(data.players);
      setCanStart(data.canStart);
    });

    socket.on('connect_error', (error) => {
      console.error('Erro de conexão:', error);
      setError('Erro ao conectar com o servidor');
    });

    return () => {
      socket.off('tournament:joined');
      socket.off('tournament:players');
      socket.off('connect_error');
    };
  }, [socket, connectionStatus]);

  const handleJoin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!socket) {
      setError('Sem conexão com o servidor');
      return;
    }

    if (connectionStatus !== 'connected') {
      setError('Aguardando conexão com o servidor...');
      return;
    }

    if (nickname.trim()) {
      console.log('Tentando entrar com nickname:', nickname.trim());
      socket.emit('tournament:join', nickname.trim());
    } else {
      setError('Digite um nickname válido');
    }
  };

  const handleStart = () => {
    if (socket && connectionStatus === 'connected') {
      console.log('Iniciando torneio');
      socket.emit('tournament:start');
    }
  };

  if (!joined) {
    return (
      <div className="waiting-room">
        <h2>Entrar no Torneio</h2>
        {error && <p className="error">{error}</p>}
        <p className="connection-status">
          Status: {connectionStatus === 'connected' ? 'Conectado' : 'Desconectado'}
        </p>
        <form onSubmit={handleJoin}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Digite seu nickname"
            required
            disabled={connectionStatus !== 'connected'}
          />
          <button 
            type="submit"
            disabled={connectionStatus !== 'connected'}
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="waiting-room">
      <h2>Sala de Espera</h2>
      {error && <p className="error">{error}</p>}
      <p className="connection-status">
        Status: {connectionStatus === 'connected' ? 'Conectado' : 'Desconectado'}
      </p>
      <div className="players-list">
        <h3>Jogadores ({players.length}/6)</h3>
        <ul>
          {players.map((player) => (
            <li key={player.id}>{player.nickname}</li>
          ))}
        </ul>
      </div>
      {canStart && (
        <button 
          onClick={handleStart}
          disabled={connectionStatus !== 'connected'}
        >
          Iniciar Torneio
        </button>
      )}
      {!canStart && (
        <p>Aguardando mais jogadores...</p>
      )}
    </div>
  );
};

export default WaitingRoom; 