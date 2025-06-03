import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  useEffect(() => {
    console.log('Tentando conectar ao servidor...');
    const newSocket = io('http://localhost:3000', {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('Conectado ao servidor!');
      setConnectionStatus('connected');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Erro ao conectar:', error);
      setConnectionStatus('error');
    });

    newSocket.on('disconnect', () => {
      console.log('Desconectado do servidor');
      setConnectionStatus('disconnected');
    });

    newSocket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`Tentativa de reconexão ${attemptNumber}`);
    });

    newSocket.on('reconnect', (attemptNumber) => {
      console.log(`Reconectado após ${attemptNumber} tentativas`);
      setConnectionStatus('connected');
    });

    setSocket(newSocket);

    return () => {
      console.log('Desconectando...');
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connectionStatus }}>
      {children}
    </SocketContext.Provider>
  );
}; 