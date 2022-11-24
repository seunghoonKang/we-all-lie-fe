import { io } from 'socket.io-client';

export const socket = io('https://tastekim.shop', {
  cors: {
    origin: 'http://localhost:3000',
  },
  transports: ['websocket', 'polling'],
});
